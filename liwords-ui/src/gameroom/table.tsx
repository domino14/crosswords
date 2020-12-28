import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Card, message, Popconfirm } from 'antd';
import { HomeOutlined } from '@ant-design/icons/lib';
import axios from 'axios';

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useMountedState } from '../utils/mounted';
import { BoardPanel } from './board_panel';
import { TopBar } from '../topbar/topbar';
import { Chat } from '../chat/chat';
import {
  useExaminableGameContextStoreContext,
  useExamineStoreContext,
  useGameContextStoreContext,
  useGameEndMessageStoreContext,
  useLoginStateStoreContext,
  usePoolFormatStoreContext,
  useRematchRequestStoreContext,
  useTimerStoreContext,
  useTournamentStoreContext,
} from '../store/store';
import { PlayerCards } from './player_cards';
import Pool from './pool';
import {
  MessageType,
  TimedOut,
  MatchRequest,
  SoughtGameProcessEvent,
  DeclineMatchRequest,
  ReadyForGame,
} from '../gen/api/proto/realtime/realtime_pb';
import { encodeToSocketFmt } from '../utils/protobuf';
import './scss/gameroom.scss';
import { ScoreCard } from './scorecard';
import {
  GameInfo,
  GameMetadata,
  PlayerMetadata,
  StreakInfoResponse,
} from './game_info';
import { BoopSounds } from '../sound/boop';
import { toAPIUrl } from '../api/api';
import { StreakWidget } from './streak_widget';
import { PlayState } from '../gen/macondo/api/proto/macondo/macondo_pb';
import { endGameMessageFromGameInfo } from '../store/end_of_game';
import { singularCount } from '../utils/plural';
import { Notepad, NotepadContextProvider } from './notepad';
import { Analyzer, AnalyzerContextProvider } from './analyzer';
import { TournamentMetadata } from '../tournament/state';

type Props = {
  sendSocketMsg: (msg: Uint8Array) => void;
  sendChat: (msg: string, chan: string) => void;
};

const StreakFetchDelay = 2000;

const defaultGameInfo = {
  players: new Array<PlayerMetadata>(),
  game_request: {
    lexicon: '',
    rules: {
      variant_name: '',
      board_layout_name: 'CrosswordGame',
      letter_distribution_name: 'english',
    },
    initial_time_seconds: 0,
    increment_seconds: 0,
    challenge_rule: 'VOID' as  // wtf typescript? is there a better way?
      | 'FIVE_POINT'
      | 'TEN_POINT'
      | 'SINGLE'
      | 'DOUBLE'
      | 'TRIPLE'
      | 'VOID',
    rating_mode: 'RATED',
    max_overtime_minutes: 0,
    original_request_id: '',
  },
  tournament_id: '',
  game_end_reason: 'NONE',
  time_control_name: '',
};

const DEFAULT_TITLE = 'Woogles.io';

const ManageWindowTitle = (props: {}) => {
  const { gameContext } = useGameContextStoreContext();
  const { loginState } = useLoginStateStoreContext();
  const { userID } = loginState;

  const userIDToNick = useMemo(() => {
    const ret: { [key: string]: string } = {};
    for (const userID in gameContext.uidToPlayerOrder) {
      const playerOrder = gameContext.uidToPlayerOrder[userID];
      for (const nick in gameContext.nickToPlayerOrder) {
        if (playerOrder === gameContext.nickToPlayerOrder[nick]) {
          ret[userID] = nick;
          break;
        }
      }
    }
    return ret;
  }, [gameContext.uidToPlayerOrder, gameContext.nickToPlayerOrder]);

  const playerNicks = useMemo(() => {
    return gameContext.players.map((player) => userIDToNick[player.userID]);
  }, [gameContext.players, userIDToNick]);

  const myId = useMemo(() => {
    const myPlayerOrder = gameContext.uidToPlayerOrder[userID];
    // eslint-disable-next-line no-nested-ternary
    return myPlayerOrder === 'p0' ? 0 : myPlayerOrder === 'p1' ? 1 : null;
  }, [gameContext.uidToPlayerOrder, userID]);

  const gameDone = gameContext.playState === PlayState.GAME_OVER;

  const desiredTitle = useMemo(() => {
    let title = '';
    if (!gameDone && myId === gameContext.onturn) {
      title += '*';
    }
    let first = true;
    for (let i = 0; i < gameContext.players.length; ++i) {
      // eslint-disable-next-line no-continue
      if (gameContext.players[i].userID === userID) continue;
      if (first) {
        first = false;
      } else {
        title += ' vs ';
      }
      title += playerNicks[i] ?? '?';
      if (!gameDone && myId == null && i === gameContext.onturn) {
        title += '*';
      }
    }
    if (title.length > 0) title += ' - ';
    title += DEFAULT_TITLE;
    return title;
  }, [
    gameContext.onturn,
    gameContext.players,
    gameDone,
    myId,
    playerNicks,
    userID,
  ]);

  useEffect(() => {
    document.title = desiredTitle;
  }, [desiredTitle]);

  useEffect(() => {
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, []);

  return null;
};

const getChatTitle = (
  playerNames: Array<string> | undefined,
  username: string,
  isObserver: boolean
): string => {
  if (!playerNames) {
    return '';
  }
  if (isObserver) {
    return playerNames.join(' versus ');
  }
  return playerNames.filter((n) => n !== username).shift() || '';
};

export const Table = React.memo((props: Props) => {
  const { useState } = useMountedState();

  const { gameID } = useParams();
  const {
    gameContext: examinableGameContext,
  } = useExaminableGameContextStoreContext();
  const {
    isExamining,
    handleExamineStart,
    handleExamineGoTo,
  } = useExamineStoreContext();
  const { gameContext } = useGameContextStoreContext();
  const { gameEndMessage, setGameEndMessage } = useGameEndMessageStoreContext();
  const { loginState } = useLoginStateStoreContext();
  const { poolFormat, setPoolFormat } = usePoolFormatStoreContext();
  const { rematchRequest, setRematchRequest } = useRematchRequestStoreContext();
  const { pTimedOut, setPTimedOut } = useTimerStoreContext();
  const { username, userID } = loginState;
  const {
    tournamentContext,
    setTournamentContext,
  } = useTournamentStoreContext();
  const [playerNames, setPlayerNames] = useState(new Array<string>());
  const { sendSocketMsg } = props;
  // const location = useLocation();
  const [gameInfo, setGameInfo] = useState<GameMetadata>(defaultGameInfo);
  const [streakGameInfo, setStreakGameInfo] = useState<StreakInfoResponse>({
    streak: [],
  });
  const [isObserver, setIsObserver] = useState(false);

  useEffect(() => {
    // Prevent backspace unless we're in an input element. We don't want to
    // leave if we're on Firefox.

    const rx = /INPUT|SELECT|TEXTAREA/i;
    const evtHandler = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.which === 8) {
        if (
          !rx.test(el.tagName) ||
          (el as HTMLInputElement).disabled ||
          (el as HTMLInputElement).readOnly
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', evtHandler);
    document.addEventListener('keypress', evtHandler);

    return () => {
      document.removeEventListener('keydown', evtHandler);
      document.removeEventListener('keypress', evtHandler);
    };
  }, []);

  useEffect(() => {
    if (gameContext.playState === PlayState.GAME_OVER || isObserver) {
      return () => {};
    }

    const evtHandler = (evt: BeforeUnloadEvent) => {
      if (gameContext.playState !== PlayState.GAME_OVER && !isObserver) {
        const msg = 'You are currently in a game!';
        // eslint-disable-next-line no-param-reassign
        evt.returnValue = msg;
        return msg;
      }
      return true;
    };
    window.addEventListener('beforeunload', evtHandler);
    return () => {
      window.removeEventListener('beforeunload', evtHandler);
    };
  }, [gameContext.playState, isObserver]);

  useEffect(() => {
    // Request game API to get info about the game at the beginning.
    console.log('gonna fetch metadata, game id is', gameID);
    axios
      .post<GameMetadata>(
        toAPIUrl('game_service.GameMetadataService', 'GetMetadata'),
        {
          gameId: gameID,
        }
      )
      .then((resp) => {
        setGameInfo(resp.data);
        if (localStorage?.getItem('poolFormat')) {
          setPoolFormat(
            parseInt(localStorage.getItem('poolFormat') || '0', 10)
          );
        }
        if (resp.data.game_end_reason !== 'NONE') {
          // Basically if we are here, we've reloaded the page after the game
          // ended. We want to synthesize a new GameEnd message
          setGameEndMessage(endGameMessageFromGameInfo(resp.data));
        }
      })
      .catch((err) => {
        message.error({
          content: `Failed to fetch game information; please refresh. (Error: ${err.message})`,
          duration: 10,
        });
      });

    return () => {
      setGameInfo(defaultGameInfo);
      message.destroy('board-messages');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameID]);

  useEffect(() => {
    if (!gameInfo.tournament_id) {
      return;
    }
    axios
      .post<TournamentMetadata>(
        toAPIUrl(
          'tournament_service.TournamentService',
          'GetTournamentMetadata'
        ),
        {
          id: gameInfo.tournament_id,
        }
      )
      .then((resp) => {
        setTournamentContext({
          metadata: resp.data,
        });
      });
  }, [gameInfo.tournament_id, setTournamentContext]);

  useEffect(() => {
    // Request streak info only if a few conditions are true.
    // We want to request it as soon as the original request ID comes in,
    // but only if this is an ongoing game. Also, we want to request it
    // as soon as the game ends (so the streak updates without having to go
    // to a new game).

    if (!gameInfo.game_request.original_request_id) {
      return;
    }
    if (gameContext.playState === PlayState.GAME_OVER && !gameEndMessage) {
      // if the game has long been over don't request this. Only request it
      // when we are going to play a game (or observe), or when the game just ended.
      return;
    }
    setTimeout(() => {
      axios
        .post<StreakInfoResponse>(
          toAPIUrl('game_service.GameMetadataService', 'GetRematchStreak'),
          {
            original_request_id: gameInfo.game_request.original_request_id,
          }
        )
        .then((streakresp) => {
          setStreakGameInfo(streakresp.data);
        });
      // Put this on a delay. Otherwise the game might not be saved to the
      // db as having finished before the gameEndMessage comes in.
    }, StreakFetchDelay);

    // Call this when a gameEndMessage comes in, so the streak updates
    // at the end of the game.
  }, [
    gameInfo.game_request.original_request_id,
    gameEndMessage,
    gameContext.playState,
  ]);

  useEffect(() => {
    if (pTimedOut === undefined) return;
    // Otherwise, player timed out. This will only send once.
    // Send the time out if we're either of both players that are in the game.
    if (isObserver) return;

    let timedout = '';

    gameInfo.players.forEach((p) => {
      if (gameContext.uidToPlayerOrder[p.user_id] === pTimedOut) {
        timedout = p.user_id;
      }
    });

    const to = new TimedOut();
    to.setGameId(gameID);
    to.setUserId(timedout);
    sendSocketMsg(
      encodeToSocketFmt(MessageType.TIMED_OUT, to.serializeBinary())
    );
    setPTimedOut(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pTimedOut, gameContext.nickToPlayerOrder, gameID]);

  useEffect(() => {
    let observer = true;
    gameInfo.players.forEach((p) => {
      if (userID === p.user_id) {
        observer = false;
      }
    });
    setIsObserver(observer);
    setPlayerNames(gameInfo.players.map((p) => p.nickname));
    // If we are not the observer, tell the server we're ready for the game to start.
    if (gameInfo.game_end_reason === 'NONE' && !observer) {
      const evt = new ReadyForGame();
      evt.setGameId(gameID);
      sendSocketMsg(
        encodeToSocketFmt(MessageType.READY_FOR_GAME, evt.serializeBinary())
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, gameInfo]);

  const acceptRematch = useCallback(
    (reqID: string) => {
      const evt = new SoughtGameProcessEvent();
      evt.setRequestId(reqID);
      sendSocketMsg(
        encodeToSocketFmt(
          MessageType.SOUGHT_GAME_PROCESS_EVENT,
          evt.serializeBinary()
        )
      );
    },
    [sendSocketMsg]
  );

  const handleAcceptRematch = useCallback(() => {
    acceptRematch(rematchRequest.getGameRequest()!.getRequestId());
    setRematchRequest(new MatchRequest());
  }, [acceptRematch, rematchRequest, setRematchRequest]);

  const declineRematch = useCallback(
    (reqID: string) => {
      const evt = new DeclineMatchRequest();
      evt.setRequestId(reqID);
      sendSocketMsg(
        encodeToSocketFmt(
          MessageType.DECLINE_MATCH_REQUEST,
          evt.serializeBinary()
        )
      );
    },
    [sendSocketMsg]
  );

  const handleDeclineRematch = useCallback(() => {
    declineRematch(rematchRequest.getGameRequest()!.getRequestId());
    setRematchRequest(new MatchRequest());
  }, [declineRematch, rematchRequest, setRematchRequest]);

  // Figure out what rack we should display.
  // If we are one of the players, display our rack.
  // If we are NOT one of the players (so an observer), display the rack of
  // the player on turn.
  let rack;
  const gameDone = gameContext.playState === PlayState.GAME_OVER;
  const us = useMemo(() => gameInfo.players.find((p) => p.user_id === userID), [
    gameInfo.players,
    userID,
  ]);
  if (us && !(gameDone && isExamining)) {
    rack = examinableGameContext.players.find((p) => p.userID === us.user_id)
      ?.currentRack;
  } else {
    rack =
      examinableGameContext.players.find((p) => p.onturn)?.currentRack || '';
  }

  // The game "starts" when the GameHistoryRefresher object comes in via the socket.
  // At that point gameID will be filled in.

  useEffect(() => {
    // Don't play when loading from history
    if (!gameDone) {
      BoopSounds.playSound('startgameSound');
    }
  }, [gameID, gameDone]);

  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [
    location,
  ]);
  const searchedTurn = useMemo(() => searchParams.get('turn'), [searchParams]);
  const turnAsStr = us && !gameDone ? '' : searchedTurn ?? ''; // Do not examine our current games.
  const hasActivatedExamineRef = useRef(false);
  const [autocorrectURL, setAutocorrectURL] = useState(false);
  useEffect(() => {
    if (gameContext.gameID) {
      if (!hasActivatedExamineRef.current) {
        hasActivatedExamineRef.current = true;
        const turnAsInt = parseInt(turnAsStr, 10);
        if (isFinite(turnAsInt) && turnAsStr === String(turnAsInt)) {
          handleExamineStart();
          handleExamineGoTo(turnAsInt - 1); // ?turn= should start from one.
        }
        setAutocorrectURL(true); // Trigger rerender.
      }
    }
  }, [gameContext.gameID, turnAsStr, handleExamineStart, handleExamineGoTo]);

  // Autocorrect the turn on the URL.
  // Do not autocorrect when NEW_GAME_EVENT redirects to a rematch.
  const canAutocorrectURL = autocorrectURL && gameID === gameContext.gameID;
  const history = useHistory();
  useEffect(() => {
    if (!canAutocorrectURL) return; // Too early if examining has not started.
    const turnParamShouldBe = isExamining
      ? String(examinableGameContext.turns.length + 1)
      : null;
    if (turnParamShouldBe !== searchedTurn) {
      if (turnParamShouldBe == null) {
        searchParams.delete('turn');
      } else {
        searchParams.set('turn', turnParamShouldBe);
      }
      history.replace({
        ...location,
        search: String(searchParams),
      });
    }
  }, [
    canAutocorrectURL,
    examinableGameContext.turns.length,
    history,
    isExamining,
    location,
    searchParams,
    searchedTurn,
  ]);
  const peopleOnlineContext = useCallback(
    (n: number) =>
      isObserver
        ? singularCount(n, 'Observer', 'Observers')
        : singularCount(n, 'Player', 'Players'),
    [isObserver]
  );

  let ret = (
    <div className="game-container">
      <ManageWindowTitle />
      <TopBar tournamentID={gameInfo.tournament_id} />
      <div className="game-table">
        <div className="chat-area" id="left-sidebar">
          <Card className="left-menu">
            {gameInfo.tournament_id ? (
              <Link to={tournamentContext.metadata.slug}>
                <HomeOutlined />
                Back to Tournament
              </Link>
            ) : (
              <Link to="/">
                <HomeOutlined />
                Back to lobby
              </Link>
            )}
          </Card>
          {playerNames.length > 1 ? (
            <Chat
              sendChat={props.sendChat}
              defaultChannel={`chat.${
                isObserver ? 'gametv' : 'game'
              }.${gameID}`}
              defaultDescription={getChatTitle(
                playerNames,
                username,
                isObserver
              )}
              peopleOnlineContext={peopleOnlineContext}
              tournamentID={gameInfo.tournament_id}
            />
          ) : null}

          {isExamining ? (
            <Analyzer includeCard lexicon={gameInfo.game_request.lexicon} />
          ) : (
            <Notepad includeCard />
          )}
        </div>
        {/* There are two player cards, css hides one of them. */}
        <div className="sticky-player-card-container">
          <PlayerCards
            horizontal
            gameMeta={gameInfo}
            playerMeta={gameInfo.players}
          />
        </div>
        <div className="play-area">
          <BoardPanel
            username={username}
            board={examinableGameContext.board}
            currentRack={rack || ''}
            events={examinableGameContext.turns}
            gameID={gameID}
            sendSocketMsg={props.sendSocketMsg}
            gameDone={gameDone}
            playerMeta={gameInfo.players}
            tournamentID={gameInfo.tournament_id}
            tournamentSlug={tournamentContext.metadata.slug}
            lexicon={gameInfo.game_request.lexicon}
            challengeRule={gameInfo.game_request.challenge_rule}
            handleAcceptRematch={
              rematchRequest.getRematchFor() === gameID
                ? handleAcceptRematch
                : null
            }
          />
          <StreakWidget streakInfo={streakGameInfo} />
        </div>
        <div className="data-area" id="right-sidebar">
          {/* There are two player cards, css hides one of them. */}
          <PlayerCards gameMeta={gameInfo} playerMeta={gameInfo.players} />
          <GameInfo
            meta={gameInfo}
            tournamentName={tournamentContext.metadata.name}
          />
          <Pool
            pool={examinableGameContext?.pool}
            currentRack={rack || ''}
            poolFormat={poolFormat}
            setPoolFormat={setPoolFormat}
          />
          <Popconfirm
            title={`${rematchRequest
              .getUser()
              ?.getDisplayName()} sent you a rematch request`}
            visible={rematchRequest.getRematchFor() !== ''}
            onConfirm={handleAcceptRematch}
            onCancel={handleDeclineRematch}
            okText="Accept"
            cancelText="Decline"
          />
          <ScoreCard
            isExamining={isExamining}
            username={username}
            playing={us !== undefined}
            lexicon={gameInfo.game_request.lexicon}
            events={examinableGameContext.turns}
            board={examinableGameContext.board}
            playerMeta={gameInfo.players}
            poolFormat={poolFormat}
          />
        </div>
      </div>
    </div>
  );
  ret = <NotepadContextProvider children={ret} />;
  ret = <AnalyzerContextProvider children={ret} />;
  return ret;
});
