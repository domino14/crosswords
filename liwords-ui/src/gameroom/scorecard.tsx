import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useMountedState } from '../utils/mounted';
import { Card } from 'antd';
import {
  GameEvent,
  GameEvent_Type,
} from '../gen/macondo/api/proto/macondo/macondo_pb';
import { Board } from '../utils/cwgame/board';
import { PlayerAvatar } from '../shared/player_avatar';
import { millisToTimeStr } from '../store/timer_controller';
import {
  nicknameFromEvt,
  tilePlacementEventDisplay,
} from '../utils/cwgame/game_event';
import { Turn, gameEventsToTurns } from '../store/reducers/turns';
import { PoolFormatType } from '../constants/pool_formats';
import { Notepad } from './notepad';
import { sortTiles } from '../store/constants';
import { getVW, isTablet } from '../utils/cwgame/common';
import { Analyzer } from './analyzer';
import { HeartFilled } from '@ant-design/icons';
import { PlayerInfo } from '../gen/api/proto/ipc/omgwords_pb';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const screenSizes = require('../base.scss').default;

type Props = {
  isExamining?: boolean;
  playing: boolean;
  username: string;
  events: Array<GameEvent>;
  board: Board;
  lexicon: string;
  variant?: string;
  poolFormat: PoolFormatType;
  playerMeta: Array<PlayerInfo>;
  gameEpilog: React.ReactElement;
  hideExtraInteractions?: boolean;
};

type turnProps = {
  playerMeta: Array<PlayerInfo>;
  playing: boolean;
  username: string;
  turn: Turn;
  board: Board;
};

type MoveEntityObj = {
  player: Partial<PlayerInfo>;
  coords: string;
  timeRemaining: string;
  moveType: string | ReactNode;
  rack: string;
  play: string | ReactNode;
  score: string;
  oldScore: number;
  cumulative: number;
  bonus: number;
  endRackPts: number;
  lostScore: number;
  isBingo: boolean;
};

const displaySummary = (evt: GameEvent, board: Board) => {
  // Handle just a subset of the possible moves here. These may be modified
  // later on.
  switch (evt.type) {
    case GameEvent_Type.EXCHANGE:
      return <span className="exchanged">-{sortTiles(evt.exchanged)}</span>;

    case GameEvent_Type.PASS:
      return <span className="pass">Passed turn</span>;

    case GameEvent_Type.TILE_PLACEMENT_MOVE:
      return tilePlacementEventDisplay(evt, board);
    case GameEvent_Type.UNSUCCESSFUL_CHALLENGE_TURN_LOSS:
      return <span className="challenge unsuccessful">Challenged</span>;
    case GameEvent_Type.END_RACK_PENALTY:
      return <span className="final-rack">Tiles on rack</span>;
    case GameEvent_Type.TIME_PENALTY:
      return <span className="time-penalty">Time penalty</span>;
  }
  return '';
};

const displayType = (evt: GameEvent) => {
  switch (evt.type) {
    case GameEvent_Type.EXCHANGE:
      return <span className="exchanged">EXCH</span>;
    case GameEvent_Type.CHALLENGE:
    case GameEvent_Type.CHALLENGE_BONUS:
    case GameEvent_Type.UNSUCCESSFUL_CHALLENGE_TURN_LOSS:
      return <span className="challenge">&nbsp;</span>;
    default:
      return <span className="other">&nbsp;</span>;
  }
};

const ScorecardTurn = (props: turnProps) => {
  const memoizedTurn: MoveEntityObj = useMemo(() => {
    // Create a base turn, and modify it accordingly. This is memoized as we
    // don't want to do this relatively expensive computation all the time.
    const evts = props.turn;

    let oldScore;
    if (evts[0].lostScore) {
      oldScore = evts[0].cumulative + evts[0].lostScore;
    } else if (evts[0].endRackPoints) {
      oldScore = evts[0].cumulative - evts[0].endRackPoints;
    } else {
      oldScore = evts[0].cumulative - evts[0].score;
    }
    let timeRemaining = '';
    if (
      evts[0].type !== GameEvent_Type.END_RACK_PTS &&
      evts[0].type !== GameEvent_Type.END_RACK_PENALTY
    ) {
      timeRemaining = millisToTimeStr(evts[0].millisRemaining, false);
    }

    const turnNickname = nicknameFromEvt(evts[0], props.playerMeta);
    const turn = {
      player: props.playerMeta.find(
        (playerMeta) => playerMeta.nickname === turnNickname
      ) ?? {
        nickname: turnNickname,
        // XXX: FIX THIS. avatar url should be set.
        fullName: '',
        avatarUrl: '',
      },
      coords: evts[0].position,
      timeRemaining: timeRemaining,
      rack: evts[0].rack,
      play: displaySummary(evts[0], props.board),
      score: `${evts[0].score}`,
      lostScore: evts[0].lostScore,
      moveType: displayType(evts[0]),
      cumulative: evts[0].cumulative,
      bonus: evts[0].bonus,
      endRackPts: evts[0].endRackPoints,
      oldScore: oldScore,
      isBingo: evts[0].isBingo,
    };
    if (evts.length === 1) {
      turn.rack = sortTiles(turn.rack);
      return turn;
    }
    // Otherwise, we have to make some modifications.
    if (evts[1].type === GameEvent_Type.PHONY_TILES_RETURNED) {
      turn.score = '0';
      turn.cumulative = evts[1].cumulative;
      turn.play = (
        <>
          <span className="challenge successful">Challenge!</span>
          <span className="main-word">
            {displaySummary(evts[0], props.board)}
          </span>
        </>
      );
      turn.rack = 'Play is invalid';
    } else {
      if (evts[1].type === GameEvent_Type.CHALLENGE_BONUS) {
        turn.cumulative = evts[1].cumulative;
        turn.play = (
          <>
            <span className="challenge unsuccessful">Challenge!</span>
            <span className="main-word">
              {displaySummary(evts[0], props.board)}
            </span>
          </>
        );
        turn.rack = `Play is valid ${sortTiles(evts[0].rack)}`;
      } else {
        // Void challenge combines the end rack points.
        turn.rack = sortTiles(turn.rack);
      }
      // Otherwise, just add/subtract as needed.
      for (let i = 1; i < evts.length; i++) {
        switch (evts[i].type) {
          case GameEvent_Type.CHALLENGE_BONUS:
            turn.score = `${turn.score} +${evts[i].bonus}`;
            break;
          case GameEvent_Type.END_RACK_PTS:
            turn.score = `${turn.score} +${evts[i].endRackPoints}`;
            break;
        }
        turn.cumulative = evts[i].cumulative;
      }
    }
    return turn;
  }, [props.board, props.playerMeta, props.turn]);

  let scoreChange;
  if (memoizedTurn.lostScore > 0) {
    scoreChange = `${memoizedTurn.oldScore} -${memoizedTurn.lostScore}`;
  } else if (memoizedTurn.endRackPts > 0) {
    scoreChange = `${memoizedTurn.oldScore} +${memoizedTurn.endRackPts}`;
  } else {
    scoreChange = `${memoizedTurn.oldScore} +${memoizedTurn.score}`;
  }

  return (
    <>
      <div className={`turn${memoizedTurn.isBingo ? ' bingo' : ''}`}>
        <PlayerAvatar player={memoizedTurn.player} withTooltip />
        <div className="coords-time">
          {memoizedTurn.coords ? (
            <p className="coord">{memoizedTurn.coords}</p>
          ) : (
            <p className="move-type">{memoizedTurn.moveType}</p>
          )}
          <p className="time-left">{memoizedTurn.timeRemaining}</p>
        </div>
        <div className="play">
          <p className="main-word">
            {memoizedTurn.play}
            {memoizedTurn.isBingo && <HeartFilled />}
          </p>
          <p>{memoizedTurn.rack}</p>
        </div>
        <div className="scores">
          <p className="score-change">{scoreChange}</p>
          <p className="cumulative">{memoizedTurn.cumulative}</p>
        </div>
      </div>
    </>
  );
};

export const ScoreCard = React.memo((props: Props) => {
  const { useState } = useMountedState();

  const el = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [flipHidden, setFlipHidden] = useState(true);
  const [flipEnabled, setEnableFlip] = useState(isTablet());
  const toggleFlipVisibility = useCallback(() => {
    setFlipHidden((x) => !x);
  }, []);
  const resizeListener = useCallback(() => {
    const currentEl = el.current;

    if (isTablet() && !props.hideExtraInteractions) {
      setEnableFlip(true);
    } else {
      setEnableFlip(false);
      setFlipHidden(true);
    }
    if (currentEl) {
      currentEl.scrollTop = currentEl.scrollHeight || 0;
      const boardHeight =
        document.getElementById('board-container')?.clientHeight;
      const poolTop = document.getElementById('pool')?.clientHeight || 0;
      const playerCardTop =
        document.getElementById('player-cards-vertical')?.clientHeight || 0;
      const navHeight = document.getElementById('main-nav')?.clientHeight || 0;
      let offset = 0;
      if (getVW() > parseInt(screenSizes.screenSizeLaptop)) {
        offset = 45;
      }
      if (getVW() > parseInt(screenSizes.screenSizeDesktop)) {
        offset = 25;
      }
      if (
        boardHeight &&
        getVW() >= parseInt(screenSizes.screenSizeTablet, 10)
      ) {
        setCardHeight(
          boardHeight +
            offset -
            currentEl?.getBoundingClientRect().top -
            window.pageYOffset -
            poolTop -
            playerCardTop -
            15 +
            navHeight
        );
      } else {
        setCardHeight(0);
      }
    }
  }, [props.hideExtraInteractions]);
  useEffect(() => {
    resizeListener();
  }, [props.events, props.poolFormat, resizeListener]);
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [resizeListener]);

  const turns = useMemo(() => gameEventsToTurns(props.events), [props.events]);
  const cardStyle = useMemo(
    () =>
      cardHeight
        ? {
            maxHeight: cardHeight,
            minHeight: cardHeight,
          }
        : undefined,
    [cardHeight]
  );
  const notepadStyle = useMemo(
    () =>
      cardHeight
        ? {
            height: cardHeight - 24,
            display: flipHidden ? 'none' : 'flex',
          }
        : undefined,
    [cardHeight, flipHidden]
  );
  const analyzerStyle = useMemo(
    () =>
      cardHeight
        ? {
            height: cardHeight,
            display: flipHidden ? 'none' : 'flex',
          }
        : undefined,
    [cardHeight, flipHidden]
  );
  let title = `Turn ${turns.length + 1}`;
  let extra = null;
  if (flipEnabled) {
    if (props.isExamining) {
      title = !flipHidden ? 'Analyzer' : `Turn ${turns.length + 1}`;
      extra = !flipHidden ? 'View Scorecard' : 'View Analyzer';
    } else {
      title = !flipHidden ? 'Notepad' : `Turn ${turns.length + 1}`;
      extra = !flipHidden ? 'View Scorecard' : 'View Notepad';
    }
  }
  return (
    <Card
      className={`score-card${flipHidden ? '' : ' flipped'}`}
      title={title}
      extra={
        isTablet() ? (
          <button className="link" onClick={toggleFlipVisibility}>
            {extra}
          </button>
        ) : null
      }
    >
      <div ref={el} style={cardStyle}>
        {props.isExamining ? (
          <Analyzer
            lexicon={props.lexicon}
            variant={props.variant}
            style={analyzerStyle}
          />
        ) : (
          <Notepad style={notepadStyle} />
        )}
        {flipHidden ? (
          <React.Fragment>
            {turns.map((t, idx) =>
              t.length === 0 ? null : (
                <ScorecardTurn
                  turn={t}
                  board={props.board}
                  key={`t_${idx + 0}`}
                  playerMeta={props.playerMeta}
                  playing={props.playing}
                  username={props.username}
                />
              )
            )}
            {props.gameEpilog}
          </React.Fragment>
        ) : null}
      </div>
    </Card>
  );
});
