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
  ChatEntityType,
  useChatStoreContext,
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
import { encodeToSocketFmt } from '../utils/protobuf';
import './scss/gameroom.scss';
import { ScoreCard } from './scorecard';
import {
  defaultGameInfo,
  DefineWordsResponse,
  GameInfo,
  GameMetadata,
  StreakInfoResponse,
} from './game_info';
import { BoopSounds } from '../sound/boop';
import { toAPIUrl } from '../api/api';
import { StreakWidget } from './streak_widget';
import {
  GameEvent,
  PlayState,
} from '../gen/macondo/api/proto/macondo/macondo_pb';
import { endGameMessageFromGameInfo } from '../store/end_of_game';
import { Notepad, NotepadContextProvider } from './notepad';
import { Analyzer, AnalyzerContextProvider } from './analyzer';
import { isClubType, isPairedMode, sortTiles } from '../store/constants';
import { readyForTournamentGame } from '../store/reducers/tournament_reducer';
import { CompetitorStatus } from '../tournament/competitor_status';
import { Unrace } from '../utils/unrace';
import { MetaEventControl } from './meta_event_control';
import { Blank } from '../utils/cwgame/common';
import { useTourneyMetadata } from '../tournament/utils';
import { Disclaimer } from './disclaimer';
import { alphabetFromName } from '../constants/alphabets';
import { ReadyForGame, TimedOut } from '../gen/api/proto/ipc/omgwords_pb';
import { MessageType } from '../gen/api/proto/ipc/ipc_pb';
import {
  DeclineSeekRequest,
  SeekRequest,
  SoughtGameProcessEvent,
} from '../gen/api/proto/ipc/omgseeks_pb';

type Props = {
  sendSocketMsg: (msg: Uint8Array) => void;
  sendChat: (msg: string, chan: string) => void;
};

const StreakFetchDelay = 2000;

const DEFAULT_TITLE = 'Woogles.io';

const ManageWindowTitleAndTurnSound = (props: {}) => {
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

  const gameDone =
    gameContext.playState === PlayState.GAME_OVER && !!gameContext.gameID;

  // do not play sound when game ends (e.g. resign) or has not loaded
  const canPlaySound = !gameDone && gameContext.gameID;
  const soundUnlocked = useRef(false);
  useEffect(() => {
    if (canPlaySound) {
      if (!soundUnlocked.current) {
        // ignore first sound
        soundUnlocked.current = true;
        return;
      }

      if (myId === gameContext.onturn) {
        BoopSounds.playSound('oppMoveSound');
      } else {
        BoopSounds.playSound('makeMoveSound');
      }
    } else {
      soundUnlocked.current = false;
    }
  }, [canPlaySound, myId, gameContext.onturn]);

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
  const { addChat } = useChatStoreContext();
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
  const { username, userID, loggedIn } = loginState;
  const {
    tournamentContext,
    dispatchTournamentContext,
  } = useTournamentStoreContext();
  const competitorState = tournamentContext.competitorState;
  const isRegistered = competitorState.isRegistered;
  const [playerNames, setPlayerNames] = useState(new Array<string>());
  const { sendSocketMsg } = props;
  // const location = useLocation();
  const [gameInfo, setGameInfo] = useState<GameMetadata>(defaultGameInfo);
  const [streakGameInfo, setStreakGameInfo] = useState<StreakInfoResponse>({
    streak: [],
    playersInfo: [],
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

  const gameDone =
    gameContext.playState === PlayState.GAME_OVER && !!gameContext.gameID;

  useEffect(() => {
    if (gameDone || isObserver) {
      return () => {};
    }

    const evtHandler = (evt: BeforeUnloadEvent) => {
      if (!gameDone && !isObserver) {
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
  }, [gameDone, isObserver]);

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
    // React Hook useEffect has missing dependencies: 'setGameEndMessage' and 'setPoolFormat'.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameID]);

  useTourneyMetadata(
    '',
    gameInfo.tournament_id,
    dispatchTournamentContext,
    loginState,
    undefined
  );

  useEffect(() => {
    // Request streak info only if a few conditions are true.
    // We want to request it as soon as the original request ID comes in,
    // but only if this is an ongoing game. Also, we want to request it
    // as soon as the game ends (so the streak updates without having to go
    // to a new game).

    if (!gameInfo.game_request.original_request_id) {
      return;
    }
    if (gameDone && !gameEndMessage) {
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
  }, [gameInfo.game_request.original_request_id, gameEndMessage, gameDone]);

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
    // React Hook useEffect has missing dependencies: 'gameContext.uidToPlayerOrder', 'gameInfo.players', 'isObserver', 'sendSocketMsg', and 'setPTimedOut'.
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
    // React Hook useEffect has missing dependencies: 'gameID' and 'sendSocketMsg'.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, gameInfo]);

  // undefined = not known
  const [wordInfo, setWordInfo] = useState<{
    [key: string]: undefined | { v: boolean; d: string };
  }>({});
  const wordInfoRef = useRef(wordInfo);
  wordInfoRef.current = wordInfo;
  const [unrace, setUnrace] = useState(new Unrace());
  // undefined = not ready to report
  // null = game may have ended, check if ready to report
  const [phonies, setPhonies] = useState<undefined | null | Array<string>>(
    undefined
  );

  const [showDefinitionHover, setShowDefinitionHover] = useState<
    { x: number; y: number; words: Array<string> } | undefined
  >(undefined);
  const [willHideDefinitionHover, setWillHideDefinitionHover] = useState(false);

  const anagrams = gameInfo.game_request.rules.variant_name === 'wordsmog';
  const [definedAnagram, setDefinedAnagram] = useState(0);
  const definedAnagramRef = useRef(definedAnagram);
  definedAnagramRef.current = definedAnagram;

  const definitionPopover = useMemo(() => {
    if (!showDefinitionHover) return undefined;
    const entries = [];
    const numAnagramsEach = [];
    for (const word of showDefinitionHover.words) {
      const uppercasedWord = word.toUpperCase();
      const definition = wordInfo[uppercasedWord];
      // if phony-checker returned {v:true,d:""}, wait for definition to load
      if (definition && !(definition.v && !definition.d)) {
        if (anagrams && definition.v) {
          const shortList = []; // list of words and invalid entries
          const anagramDefinitions = []; // defined words
          for (const singleEntry of definition.d.split('\n')) {
            const m = singleEntry.match(/^([^-]*) - (.*)$/m)!;
            if (m) {
              const [, actualWord, actualDefinition] = m;
              anagramDefinitions.push({
                word: actualWord,
                definition: (
                  <React.Fragment>
                    <span className="defined-word">{actualWord}</span> -{' '}
                    {actualDefinition}
                  </React.Fragment>
                ),
              });
              shortList.push(actualWord);
            } else {
              shortList.push(singleEntry);
            }
          }
          const defineWhich =
            anagramDefinitions.length > 0
              ? definedAnagramRef.current % anagramDefinitions.length
              : 0;
          const anagramDefinition = anagramDefinitions[defineWhich];
          entries.push(
            <li key={entries.length} className="definition-entry">
              {uppercasedWord} -{' '}
              {shortList.map((word, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && ', '}
                  {word === anagramDefinition?.word ? (
                    <span className="defined-word">{word}</span>
                  ) : (
                    word
                  )}
                </React.Fragment>
              ))}
            </li>
          );
          if (anagramDefinitions.length > 0) {
            numAnagramsEach.push(anagramDefinitions.length);
            entries.push(
              <li key={entries.length} className="definition-entry">
                {anagramDefinition.definition}
              </li>
            );
          }
        } else {
          entries.push(
            <li key={entries.length} className="definition-entry">
              <span className="defined-word">
                {uppercasedWord}
                {definition.v ? '' : '*'}
              </span>{' '}
              -{' '}
              {definition.v ? (
                <span className="definition">{String(definition.d)}</span>
              ) : (
                <span className="invalid-word">
                  {anagrams ? 'no valid words' : 'not a word'}
                </span>
              )}
            </li>
          );
        }
      }
    }
    if (numAnagramsEach.length > 0) {
      const numAnagramsLCM = numAnagramsEach.reduce((a, b) => {
        const ab = a * b;
        while (b !== 0) {
          const t = b;
          b = a % b;
          a = t;
        }
        return ab / a; // a = gcd, so ab/a = lcm
      });
      setDefinedAnagram((definedAnagramRef.current + 1) % numAnagramsLCM);
    } else {
      setDefinedAnagram(0);
    }
    if (!entries.length) return undefined;
    return {
      x: showDefinitionHover.x,
      y: showDefinitionHover.y,
      content: <ul className="definitions">{entries}</ul>,
    };
  }, [anagrams, showDefinitionHover, wordInfo]);

  const hideDefinitionHover = useCallback(() => {
    setShowDefinitionHover(undefined);
  }, []);

  useEffect(() => {
    if (willHideDefinitionHover) {
      // if the pointer is moved out of a tile, the definition is not hidden
      // immediately. this is an intentional design decision to improve
      // usability and responsiveness, and it enables smoother transition if
      // the pointer is moved to a nearby tile.
      const t = setTimeout(() => {
        hideDefinitionHover();
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [willHideDefinitionHover, hideDefinitionHover]);

  const enableHoverDefine = gameDone || isObserver;

  const handleSetHover = useCallback(
    (x: number, y: number, words: Array<string> | undefined) => {
      if (enableHoverDefine && words) {
        setWillHideDefinitionHover(false);
        setShowDefinitionHover((oldValue) => {
          const newValue = {
            x,
            y,
            words,
            definedAnagram,
          };
          // if the pointer is moved out of a tile and back in, and the words
          // formed have not changed, reuse the object to avoid rerendering.
          if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
            return oldValue;
          }
          return newValue;
        });
      } else {
        setWillHideDefinitionHover(true);
      }
    },
    [enableHoverDefine, definedAnagram]
  );

  const [playedWords, setPlayedWords] = useState(new Set());
  useEffect(() => {
    setPlayedWords((oldPlayedWords) => {
      const playedWords = new Set(oldPlayedWords);
      for (const turn of gameContext.turns) {
        for (const word of turn.getWordsFormedList()) {
          playedWords.add(word);
        }
      }
      return playedWords.size === oldPlayedWords.size
        ? oldPlayedWords
        : playedWords;
    });
  }, [gameContext]);

  useEffect(() => {
    // forget everything if it goes to a new game
    setWordInfo({});
    setPlayedWords(new Set());
    setUnrace(new Unrace());
    setPhonies(undefined);
    setShowDefinitionHover(undefined);
  }, [gameID, gameInfo.game_request.lexicon]);

  useEffect(() => {
    if (gameDone || showDefinitionHover) {
      // when definition is requested, get definitions for all words (up to
      // that point) that have not yet been defined. this is an intentional
      // design decision to improve usability and responsiveness.
      setWordInfo((oldWordInfo) => {
        let wordInfo = oldWordInfo;
        for (const word of (playedWords as any) as [string]) {
          if (!(word in wordInfo)) {
            if (wordInfo === oldWordInfo) wordInfo = { ...oldWordInfo };
            wordInfo[word] = undefined;
          }
        }
        if (showDefinitionHover) {
          // also define tentative words (mostly from examiner) if no undesignated blanks.
          for (const word of showDefinitionHover.words) {
            if (!word.includes(Blank)) {
              const uppercasedWord = word.toUpperCase();
              if (!(uppercasedWord in wordInfo)) {
                if (wordInfo === oldWordInfo) wordInfo = { ...oldWordInfo };
                wordInfo[uppercasedWord] = undefined;
              }
            }
          }
        }
        setPhonies((oldValue) => oldValue ?? null);
        return wordInfo;
      });
    }
  }, [playedWords, gameDone, showDefinitionHover]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    unrace.run(async () => {
      const wordInfo = wordInfoRef.current; // take the latest version after unrace
      const wordsToDefine: Array<string> = [];
      for (const word in wordInfo) {
        const definition = wordInfo[word];
        if (
          definition === undefined ||
          (showDefinitionHover && definition.v && !definition.d)
        ) {
          wordsToDefine.push(word);
        }
      }
      if (!wordsToDefine.length) return;
      wordsToDefine.sort(); // mitigate OCD
      const lexicon = gameInfo.game_request.lexicon;
      try {
        const defineResp = await axios.post<DefineWordsResponse>(
          toAPIUrl('word_service.WordService', 'DefineWords'),
          {
            lexicon,
            words: wordsToDefine,
            definitions: !!showDefinitionHover,
            anagrams,
          },
          { cancelToken: cancelTokenSource.token }
        );
        if (showDefinitionHover) {
          // for certain lexicons, try getting definitions from other sources
          for (const otherLexicon of lexicon === 'ECWL'
            ? ['CSW21', 'NWL20']
            : lexicon === 'CSW19X'
            ? ['CSW21']
            : []) {
            const wordsToRedefine = [];
            for (const word of wordsToDefine) {
              if (
                defineResp.data.results[word]?.v &&
                defineResp.data.results[word].d === word
              ) {
                wordsToRedefine.push(word);
              }
            }
            if (!wordsToRedefine.length) break;
            const otherDefineResp = await axios.post<DefineWordsResponse>(
              toAPIUrl('word_service.WordService', 'DefineWords'),
              {
                lexicon: otherLexicon,
                words: wordsToRedefine,
                definitions: !!showDefinitionHover,
                anagrams,
              },
              { cancelToken: cancelTokenSource.token }
            );
            for (const word of wordsToRedefine) {
              const newDefinition = otherDefineResp.data.results[word].d;
              if (newDefinition && newDefinition !== word) {
                defineResp.data.results[word].d = newDefinition;
              }
            }
          }
        }
        setWordInfo((oldWordInfo) => {
          const wordInfo = { ...oldWordInfo };
          for (const word of wordsToDefine) {
            wordInfo[word] = defineResp.data.results[word];
          }
          return wordInfo;
        });
      } catch (e) {
        if (axios.isCancel(e)) {
          // request canceled because it is no longer relevant.
        } else {
          // no definitions then... sadpepe.
          console.log('cannot check words', e);
        }
      }
    });
    return () => {
      cancelTokenSource.cancel();
    };
  }, [
    anagrams,
    showDefinitionHover,
    gameInfo.game_request.lexicon,
    wordInfo,
    unrace,
  ]);

  useEffect(() => {
    if (phonies === null) {
      if (gameDone) {
        const phonies = [];
        let hasWords = false; // avoid running this before the first GameHistoryRefresher event
        for (const word of (playedWords as any) as [string]) {
          hasWords = true;
          const definition = wordInfo[word];
          if (definition === undefined) {
            // not ready (this should not happen though)
            return;
          } else if (!definition.v) {
            phonies.push(word);
          }
        }
        if (hasWords) {
          phonies.sort();
          setPhonies(phonies);
          return;
        }
      }
      setPhonies(undefined); // not ready to display
    }
  }, [gameDone, phonies, playedWords, wordInfo]);

  const lastPhonyReport = useRef('');
  useEffect(() => {
    if (!phonies) return;
    if (phonies.length) {
      // since +false === 0 and +true === 1, this is [unchallenged, challenged]
      const groupedWords = [new Set(), new Set()];
      let returningTiles = false;
      for (let i = gameContext.turns.length; --i >= 0; ) {
        const turn = gameContext.turns[i];
        if (turn.getType() === GameEvent.Type.PHONY_TILES_RETURNED) {
          returningTiles = true;
        } else {
          for (const word of turn.getWordsFormedList()) {
            groupedWords[+returningTiles].add(word);
          }
          returningTiles = false;
        }
      }
      // note that a phony can appear in both lists
      const unchallengedPhonies = phonies.filter((word) =>
        groupedWords[0].has(word)
      );
      const challengedPhonies = phonies.filter((word) =>
        groupedWords[1].has(word)
      );
      const thisPhonyReport = JSON.stringify({
        challengedPhonies,
        unchallengedPhonies,
      });
      if (lastPhonyReport.current !== thisPhonyReport) {
        lastPhonyReport.current = thisPhonyReport;
        if (challengedPhonies.length) {
          addChat({
            entityType: ChatEntityType.ErrorMsg,
            sender: '',
            message: `Invalid words challenged off: ${challengedPhonies
              .map((x) => `${x}*`)
              .join(', ')}`,
            channel: 'server',
          });
        }
        if (unchallengedPhonies.length) {
          addChat({
            entityType: ChatEntityType.ErrorMsg,
            sender: '',
            message: `Invalid words played and not challenged: ${unchallengedPhonies
              .map((x) => `${x}*`)
              .join(', ')}`,
            channel: 'server',
          });
        }
      }
    } else {
      const thisPhonyReport = 'all valid';
      if (lastPhonyReport.current !== thisPhonyReport) {
        lastPhonyReport.current = thisPhonyReport;
        addChat({
          entityType: ChatEntityType.ServerMsg,
          sender: '',
          message: 'All words played are valid',
          channel: 'server',
        });
      }
    }
  }, [gameContext, phonies, addChat]);

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
    setRematchRequest(new SeekRequest());
  }, [acceptRematch, rematchRequest, setRematchRequest]);

  const declineRematch = useCallback(
    (reqID: string) => {
      const evt = new DeclineSeekRequest();
      evt.setRequestId(reqID);
      sendSocketMsg(
        encodeToSocketFmt(
          MessageType.DECLINE_SEEK_REQUEST,
          evt.serializeBinary()
        )
      );
    },
    [sendSocketMsg]
  );

  const handleDeclineRematch = useCallback(() => {
    declineRematch(rematchRequest.getGameRequest()!.getRequestId());
    setRematchRequest(new SeekRequest());
  }, [declineRematch, rematchRequest, setRematchRequest]);

  // Figure out what rack we should display.
  // If we are one of the players, display our rack.
  // If we are NOT one of the players (so an observer), display the rack of
  // the player on turn.
  let rack: string;
  const us = useMemo(() => gameInfo.players.find((p) => p.user_id === userID), [
    gameInfo.players,
    userID,
  ]);
  if (us && !(gameDone && isExamining)) {
    rack =
      examinableGameContext.players.find((p) => p.userID === us.user_id)
        ?.currentRack ?? '';
  } else {
    rack =
      examinableGameContext.players.find((p) => p.onturn)?.currentRack ?? '';
  }
  const sortedRack = useMemo(() => sortTiles(rack), [rack]);

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
  const boardTheme =
    'board--' + tournamentContext.metadata.getBoardStyle() || '';
  const tileTheme = 'tile--' + tournamentContext.metadata.getTileStyle() || '';
  const alphabet = useMemo(
    () =>
      alphabetFromName(gameInfo.game_request.rules.letter_distribution_name),
    [gameInfo]
  );
  const showingFinalTurn =
    gameContext.turns.length === examinableGameContext.turns.length;
  const gameEpilog = useMemo(() => {
    // XXX: this doesn't get updated when game ends, only when refresh?

    return (
      <React.Fragment>
        {showingFinalTurn && (
          <React.Fragment>
            {gameInfo.game_end_reason === 'FORCE_FORFEIT' && (
              <React.Fragment>
                Game ended in forfeit.{/* XXX: How to get winners? */}
              </React.Fragment>
            )}
            {gameInfo.game_end_reason === 'ABORTED' && (
              <React.Fragment>
                The game was cancelled. Rating and statistics were not affected.
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }, [gameInfo.game_end_reason, showingFinalTurn]);

  let ret = (
    <div className={`game-container${isRegistered ? ' competitor' : ''}`}>
      <ManageWindowTitleAndTurnSound />
      <TopBar tournamentID={gameInfo.tournament_id} />
      <div className={`game-table ${boardTheme} ${tileTheme}`}>
        <div
          className={`chat-area ${
            !isExamining && tournamentContext.metadata.getDisclaimer()
              ? 'has-disclaimer'
              : ''
          }`}
          id="left-sidebar"
        >
          <Card className="left-menu">
            {gameInfo.tournament_id ? (
              <Link to={tournamentContext.metadata?.getSlug()}>
                <HomeOutlined />
                Back to
                {isClubType(tournamentContext.metadata?.getType())
                  ? ' Club'
                  : ' Tournament'}
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
              highlight={tournamentContext.directors}
              highlightText="Director"
              defaultChannel={`chat.${
                isObserver ? 'gametv' : 'game'
              }.${gameID}`}
              defaultDescription={getChatTitle(
                playerNames,
                username,
                isObserver
              )}
              tournamentID={gameInfo.tournament_id}
            />
          ) : null}
          {isExamining ? (
            <Analyzer
              includeCard
              lexicon={gameInfo.game_request.lexicon}
              variant={gameInfo.game_request.rules.variant_name}
            />
          ) : (
            <React.Fragment key="not-examining">
              <Notepad includeCard />
              {tournamentContext.metadata.getDisclaimer() && (
                <Disclaimer
                  disclaimer={tournamentContext.metadata.getDisclaimer()}
                  logoUrl={tournamentContext.metadata.getLogo()}
                />
              )}
            </React.Fragment>
          )}
          {isRegistered && (
            <CompetitorStatus
              sendReady={() =>
                readyForTournamentGame(
                  sendSocketMsg,
                  tournamentContext.metadata?.getId(),
                  competitorState
                )
              }
            />
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
            anonymousViewer={!loggedIn}
            username={username}
            board={examinableGameContext.board}
            currentRack={sortedRack}
            events={examinableGameContext.turns}
            gameID={gameID}
            sendSocketMsg={props.sendSocketMsg}
            gameDone={gameDone}
            playerMeta={gameInfo.players}
            tournamentID={gameInfo.tournament_id}
            vsBot={gameInfo.game_request.player_vs_bot}
            tournamentSlug={tournamentContext.metadata?.getSlug()}
            tournamentPairedMode={isPairedMode(
              tournamentContext.metadata?.getType()
            )}
            tournamentNonDirectorObserver={
              isObserver &&
              !tournamentContext.directors?.includes(username) &&
              !loginState.perms.includes('adm')
            }
            tournamentPrivateAnalysis={tournamentContext.metadata?.getPrivateAnalysis()}
            lexicon={gameInfo.game_request.lexicon}
            alphabet={alphabet}
            challengeRule={gameInfo.game_request.challenge_rule}
            handleAcceptRematch={
              rematchRequest.getRematchFor() === gameID
                ? handleAcceptRematch
                : null
            }
            handleAcceptAbort={() => {}}
            handleSetHover={handleSetHover}
            handleUnsetHover={hideDefinitionHover}
            definitionPopover={definitionPopover}
          />
          {!gameDone && (
            <MetaEventControl
              sendSocketMsg={props.sendSocketMsg}
              gameID={gameID}
            />
          )}
          <StreakWidget streakInfo={streakGameInfo} />
        </div>
        <div className="data-area" id="right-sidebar">
          {/* There are two competitor cards, css hides one of them. */}
          {isRegistered && (
            <CompetitorStatus
              sendReady={() =>
                readyForTournamentGame(
                  sendSocketMsg,
                  tournamentContext.metadata?.getId(),
                  competitorState
                )
              }
            />
          )}
          {/* There are two player cards, css hides one of them. */}
          <PlayerCards gameMeta={gameInfo} playerMeta={gameInfo.players} />
          <GameInfo
            meta={gameInfo}
            tournamentName={tournamentContext.metadata?.getName()}
            colorOverride={tournamentContext.metadata?.getColor()}
            logoUrl={tournamentContext.metadata?.getLogo()}
          />
          <Pool
            pool={examinableGameContext?.pool}
            currentRack={sortedRack}
            poolFormat={poolFormat}
            setPoolFormat={setPoolFormat}
            alphabet={alphabet}
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
            variant={gameInfo.game_request.rules.variant_name}
            events={examinableGameContext.turns}
            board={examinableGameContext.board}
            playerMeta={gameInfo.players}
            poolFormat={poolFormat}
            gameEpilog={gameEpilog}
          />
        </div>
      </div>
    </div>
  );
  ret = <NotepadContextProvider children={ret} />;
  ret = <AnalyzerContextProvider children={ret} />;
  return ret;
});
