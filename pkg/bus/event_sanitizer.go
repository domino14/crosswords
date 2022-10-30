package bus

import (
	"context"
	"errors"
	"strconv"
	"unicode/utf8"

	"github.com/golang/protobuf/proto"

	macondopb "github.com/domino14/macondo/gen/api/proto/macondo"

	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/mod"
	"github.com/domino14/liwords/pkg/user"
	pb "github.com/domino14/liwords/rpc/api/proto/ipc"
)

// Events need to be sanitized so that we don't send user racks to people
// who shouldn't get them. Note that sanitize only runs for events that are
// sent DIRECTLY to a player (see AudUser), and not for AudGameTv for example.
func sanitize(us user.Store, evt *entity.EventWrapper, userID string) (*entity.EventWrapper, error) {
	// Depending on the event type and even the state of the game, we return a
	// sanitized event (or not).
	switch evt.Type {
	case pb.MessageType_GAME_HISTORY_REFRESHER:
		// When sent to AudUser, we should sanitize ONLY if we are someone
		// who is playing in the game. This is because observers can also
		// receive these events directly (through AudUser).
		subevt, ok := evt.Event.(*pb.GameHistoryRefresher)
		if !ok {
			return nil, errors.New("subevt-wrong-format")
		}
		// Possibly censors users
		cloned := proto.Clone(subevt).(*pb.GameHistoryRefresher)
		cloned.History = mod.CensorHistory(context.Background(), us, cloned.History)

		if subevt.History.PlayState == macondopb.PlayState_GAME_OVER {
			// no need to sanitize if the game is over.
			return entity.WrapEvent(cloned, pb.MessageType_GAME_HISTORY_REFRESHER), nil
		}
		myPlayerIndex := playerIndexFromUserID(userID, subevt.History.Players)
		if myPlayerIndex == -1 {
			// this only happens if we are not playing the game.
			return entity.WrapEvent(cloned, pb.MessageType_GAME_HISTORY_REFRESHER), nil
		}

		// Only sanitize if we are in the game.
		for _, evt := range cloned.History.Events {
			if evt.GetPlayerIndex() != uint32(myPlayerIndex) {
				evt.Rack = ""
				if evt.Type == macondopb.GameEvent_EXCHANGE {
					evt.Exchanged = strconv.Itoa(utf8.RuneCountInString(evt.Exchanged))
				}
			}
		}

		if cloned.History.Players[0].UserId == userID {
			cloned.History.LastKnownRacks[1] = ""
		} else if cloned.History.Players[1].UserId == userID {
			cloned.History.LastKnownRacks[0] = ""
		}
		return entity.WrapEvent(cloned, pb.MessageType_GAME_HISTORY_REFRESHER), nil

	case pb.MessageType_SERVER_GAMEPLAY_EVENT:
		// Server gameplay events
		// When sent to AudUser, we need to sanitize them here. When sent to
		// an AudGameTV, they are unsanitized, and handled elsewhere.
		subevt, ok := evt.Event.(*pb.ServerGameplayEvent)
		if !ok {
			return nil, errors.New("subevt-wrong-format")
		}
		if subevt.Playing == macondopb.PlayState_GAME_OVER {
			return evt, nil
		}
		if subevt.UserId == userID {
			return evt, nil
		}
		// Otherwise clone it.
		cloned := proto.Clone(subevt).(*pb.ServerGameplayEvent)
		cloned.NewRack = ""
		cloned.Event.Rack = ""
		if cloned.Event.Type == macondopb.GameEvent_EXCHANGE {
			cloned.Event.Exchanged = strconv.Itoa(utf8.RuneCountInString(cloned.Event.Exchanged))
		}
		return entity.WrapEvent(cloned, pb.MessageType_SERVER_GAMEPLAY_EVENT), nil

	default:
		return evt, nil
	}
}

func playerIndexFromUserID(userid string, playerinfo []*macondopb.PlayerInfo) int {
	// given a user id, return the index in playerinfo for the given user.
	// If the user id is not found, return -1.
	for i, p := range playerinfo {
		if p.UserId == userid {
			return i
		}
	}
	return -1
}
