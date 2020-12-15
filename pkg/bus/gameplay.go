package bus

import (
	"context"
	"errors"
	"time"

	"github.com/rs/zerolog/log"
	"google.golang.org/protobuf/proto"

	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/gameplay"
	pb "github.com/domino14/liwords/rpc/api/proto/realtime"
	"github.com/domino14/macondo/game"
	macondopb "github.com/domino14/macondo/gen/api/proto/macondo"
)

func (b *Bus) instantiateAndStartGame(ctx context.Context, accUser *entity.User, requester string,
	gameReq *pb.GameRequest, sg *entity.SoughtGame, reqID, acceptingConnID string) error {

	reqUser, err := b.userStore.GetByUUID(ctx, requester)
	if err != nil {
		return err
	}

	enabled, err := b.configStore.GamesEnabled(ctx)
	if err != nil {
		return err
	}
	if !enabled {
		return errors.New("new games are temporarily disabled; please try again in a few minutes")
	}

	// disallow anon game acceptance for now.
	if accUser.Anonymous || reqUser.Anonymous {
		return errors.New("you must log in to play games")
	}

	if (accUser.Anonymous || reqUser.Anonymous) && gameReq.RatingMode == pb.RatingMode_RATED {
		return errors.New("anonymous-players-cant-play-rated")
	}

	log.Debug().Interface("req", sg).
		Str("seek-conn", sg.ConnID()).
		Str("accepting-conn", acceptingConnID).Msg("game-request-accepted")
	assignedFirst := -1
	var tournamentID string
	if sg.Type() == entity.TypeMatch {
		if sg.MatchRequest.RematchFor != "" {
			// Assign firsts to be the the other player.
			gameID := sg.MatchRequest.RematchFor
			g, err := b.gameStore.Get(ctx, gameID)
			if err != nil {
				return err
			}
			wentFirst := 0
			players := g.History().Players
			if g.History().SecondWentFirst {
				wentFirst = 1
			}
			log.Debug().Str("went-first", players[wentFirst].Nickname).Msg("determining-first")

			// These are indices in the array passed to InstantiateNewGame
			if accUser.UUID == players[wentFirst].UserId {
				assignedFirst = 1 // reqUser should go first
			} else if reqUser.UUID == players[wentFirst].UserId {
				assignedFirst = 0 // accUser should go first
			}
		}
		tournamentID = sg.MatchRequest.TournamentId
	}

	g, err := gameplay.InstantiateNewGame(ctx, b.gameStore, b.config,
		[2]*entity.User{accUser, reqUser}, assignedFirst, gameReq, tournamentID)
	if err != nil {
		return err
	}
	// Broadcast a seek delete event, and send both parties a game redirect.
	if reqID != BotRequestID {
		b.soughtGameStore.Delete(ctx, reqID)
		err = b.sendSoughtGameDeletion(ctx, sg)
		if err != nil {
			log.Err(err).Msg("broadcasting-sg-deletion")
		}
	}

	err = b.broadcastGameCreation(g, accUser, reqUser)
	if err != nil {
		log.Err(err).Msg("broadcasting-game-creation")
	}
	// This event will result in a redirect.
	ngevt := entity.WrapEvent(&pb.NewGameEvent{
		GameId:       g.GameID(),
		AccepterCid:  acceptingConnID,
		RequesterCid: sg.ConnID(),
	}, pb.MessageType_NEW_GAME_EVENT)
	// The front end keeps track of which tabs seek/accept games etc
	// so we don't attach any extra channel info here.
	b.pubToUser(accUser.UUID, ngevt, "")
	b.pubToUser(reqUser.UUID, ngevt, "")

	tcname, variant, err := entity.VariantFromGameReq(gameReq)
	if err != nil {
		return err
	}

	log.Info().Str("newgameid", g.History().Uid).
		Str("sender", accUser.UUID).
		Str("requester", requester).
		Str("reqID", reqID).
		Str("lexicon", gameReq.Lexicon).
		Str("timectrl", string(tcname)).
		Str("variant", string(variant)).
		Str("onturn", g.NickOnTurn()).Msg("game-accepted")

	return nil
}

func (b *Bus) handleBotMove(ctx context.Context, g *entity.Game) {
	// This function should only be called if it's the bot's turn.
	onTurn := g.Game.PlayerOnTurn()
	userID := g.Game.PlayerIDOnTurn()
	g.Lock()
	defer g.Unlock()
	// We check if that game is not over because a triple challenge
	// could have ended it
	for g.PlayerOnTurn() == onTurn && g.Game.Playing() != macondopb.PlayState_GAME_OVER {
		hist := g.History()
		req := macondopb.BotRequest{GameHistory: hist}
		data, err := proto.Marshal(&req)
		if err != nil {
			log.Err(err).Msg("bot-cant-move")
			return
		}
		res, err := b.natsconn.Request("macondo.bot", data, 10*time.Second)

		if err != nil {
			if b.natsconn.LastError() != nil {
				log.Error().Msgf("bot-cant-move %v for request", b.natsconn.LastError())
			}
			log.Error().Msgf("bot-cant-move %v for request", err)
			return
		}
		log.Debug().Msgf("res: %v", string(res.Data))

		resp := macondopb.BotResponse{}
		err = proto.Unmarshal(res.Data, &resp)
		if err != nil {
			log.Err(err).Msg("bot-cant-move-unmarshal-error")
			return
		}
		switch r := resp.Response.(type) {
		case *macondopb.BotResponse_Move:
			timeRemaining := g.TimeRemaining(onTurn)

			m := game.MoveFromEvent(r.Move, g.Alphabet(), g.Board())
			err = gameplay.PlayMove(ctx, g, b.gameStore, b.userStore, b.listStatStore, b.tournamentStore, userID, onTurn, timeRemaining, m)
			if err != nil {
				log.Err(err).Msg("bot-cant-move-play-error")
				return
			}
		case *macondopb.BotResponse_Error:
			log.Error().Str("error", r.Error).Msg("bot-error")
			return
		default:
			log.Err(errors.New("should never happen")).Msg("bot-cant-move")
		}
	}

	err := b.gameStore.Set(ctx, g)
	if err != nil {
		log.Err(err).Msg("setting-game-after-bot-move")
	}

}

func (b *Bus) readyForGame(ctx context.Context, evt *pb.ReadyForGame, userID string) error {
	g, err := b.gameStore.Get(ctx, evt.GameId)
	if err != nil {
		return err
	}
	g.Lock()
	defer g.Unlock()
	log.Debug().Str("userID", userID).Interface("playing", g.Playing()).Msg("ready-for-game")
	if g.Playing() != macondopb.PlayState_PLAYING {
		return errors.New("game is over")
	}

	var readyID int

	if g.History().Players[0].UserId == userID {
		readyID = 0
	} else if g.History().Players[1].UserId == userID {
		readyID = 1
	} else {
		log.Error().Str("userID", userID).Str("gameID", evt.GameId).Msg("not-in-game")
		return errors.New("ready for game but not in game")
	}

	rf, err := b.gameStore.SetReady(ctx, evt.GameId, readyID)
	if err != nil {
		return err
	}

	// Start the game if both players are ready (or if it's a bot game).
	// readyflag will be (01 | 10) = 3 for two players.
	if rf == 3 || g.GameReq.PlayerVsBot {
		err = gameplay.StartGame(ctx, b.gameStore, b.gameEventChan, g.GameID())
		if err != nil {
			log.Err(err).Msg("starting-game")
		}

		if g.GameReq.PlayerVsBot && g.PlayerIDOnTurn() != userID {
			// Make a bot move if it's the bot's turn at the beginning.
			go b.handleBotMove(ctx, g)
		}
	}
	return nil
}

func (b *Bus) gameRefresher(ctx context.Context, gameID string) (*entity.EventWrapper, error) {
	// Get a game refresher event.
	entGame, err := b.gameStore.Get(ctx, string(gameID))
	if err != nil {
		return nil, err
	}
	entGame.RLock()
	defer entGame.RUnlock()
	if !entGame.Started && entGame.GameEndReason == pb.GameEndReason_NONE {
		return entity.WrapEvent(&pb.ServerMessage{Message: "Game is starting soon!"},
			pb.MessageType_SERVER_MESSAGE), nil
	}
	evt := entity.WrapEvent(entGame.HistoryRefresherEvent(),
		pb.MessageType_GAME_HISTORY_REFRESHER)
	return evt, nil
}

func (b *Bus) adjudicateGames(ctx context.Context) error {
	gs, err := b.gameStore.ListActive(ctx, "")

	if err != nil {
		return err
	}
	now := time.Now()
	log.Debug().Interface("active-games", gs).Msg("maybe-adjudicating...")
	for _, g := range gs {
		// These will likely be in the cache.
		entGame, err := b.gameStore.Get(ctx, g.Id)
		if err != nil {
			return err
		}
		entGame.RLock()
		onTurn := entGame.Game.PlayerOnTurn()
		started := entGame.Started
		timeRanOut := entGame.TimeRanOut(onTurn)
		entGame.RUnlock()
		if started && timeRanOut {
			log.Debug().Str("gid", g.Id).Msg("adjudicating-time-ran-out")
			err = gameplay.TimedOut(ctx, b.gameStore, b.userStore,
				b.listStatStore, b.tournamentStore, entGame.Game.PlayerIDOnTurn(), g.Id)
			log.Err(err).Msg("adjudicating-after-gameplay-timed-out")
		} else if !started && now.Sub(entGame.CreatedAt) > CancelAfter {
			log.Debug().Str("gid", g.Id).
				Interface("now", now).
				Interface("created", entGame.CreatedAt).
				Msg("canceling-never-started")
			err = gameplay.AbortGame(ctx, b.gameStore, g.Id)
			log.Err(err).Msg("adjudicating-after-abort-game")
			// Delete the game from the lobby. We do this here instead
			// of inside the gameplay package because the game event channel
			// was never registered with an unstarted game.
			wrapped := entity.WrapEvent(&pb.GameDeletion{Id: g.Id},
				pb.MessageType_GAME_DELETION)
			// XXX: Fix for tourneys ?
			wrapped.AddAudience(entity.AudLobby, "gameEnded")
			b.gameEventChan <- wrapped
		}
	}
	return nil
}
