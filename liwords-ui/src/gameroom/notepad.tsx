import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useGameContextStoreContext,
  useTentativeTileContext,
} from '../store/store';
import { sortTiles } from '../store/constants';
import {
  contiguousTilesFromTileSet,
  simpletile,
} from '../utils/cwgame/scoring';
import { Direction, isMobile } from '../utils/cwgame/common';
import { useMountedState } from '../utils/mounted';

type NotepadProps = {
  style?: React.CSSProperties;
  includeCard?: boolean;
};

const humanReadablePosition = (
  direction: Direction,
  firstLetter: simpletile
): string => {
  const readableCol = String.fromCodePoint(firstLetter.col + 65);
  const readableRow = (firstLetter.row + 1).toString();
  if (direction === Direction.Horizontal) {
    return readableRow + readableCol;
  }
  return readableCol + readableRow;
};

const NotepadContext = React.createContext({
  curNotepad: '',
  setCurNotepad: (a: string) => {},
});

export const NotepadContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { useState } = useMountedState();
  const [curNotepad, setCurNotepad] = useState('');
  const contextValue = useMemo(() => ({ curNotepad, setCurNotepad }), [
    curNotepad,
    setCurNotepad,
  ]);

  return <NotepadContext.Provider value={contextValue} children={children} />;
};

export const Notepad = React.memo((props: NotepadProps) => {
  const notepadEl = useRef<HTMLTextAreaElement>(null);
  const { curNotepad, setCurNotepad } = useContext(NotepadContext);
  const {
    displayedRack,
    placedTiles,
    placedTilesTempScore,
  } = useTentativeTileContext();
  const { gameContext } = useGameContextStoreContext();
  const board = gameContext.board;
  const addPlay = useCallback(() => {
    const contiguousTiles = contiguousTilesFromTileSet(placedTiles, board);
    let play = '';
    let position = '';
    const leave = sortTiles(displayedRack.split('').sort().join(''));
    if (contiguousTiles?.length === 2) {
      position = humanReadablePosition(
        contiguousTiles[1],
        contiguousTiles[0][0]
      );
      let inParen = false;
      for (const tile of contiguousTiles[0]) {
        if (!tile.fresh) {
          if (!inParen) {
            play += '(';
            inParen = true;
          }
        } else {
          if (inParen) {
            play += ')';
            inParen = false;
          }
        }
        play += tile.letter;
      }
      if (inParen) play += ')';
    }
    setCurNotepad(
      `${curNotepad ? curNotepad + '\n' : ''}${
        play ? position + ' ' + play + ' ' : ''
      }${placedTilesTempScore ? placedTilesTempScore + ' ' : ''}${leave}`
    );
    // Return focus to board on all but mobile so the key commands can be used immediately
    if (!isMobile()) {
      document.getElementById('board-container')?.focus();
    }
  }, [
    displayedRack,
    placedTiles,
    placedTilesTempScore,
    curNotepad,
    setCurNotepad,
    board,
  ]);
  useEffect(() => {
    if (notepadEl.current && !(notepadEl.current === document.activeElement)) {
      notepadEl.current.scrollTop = notepadEl.current.scrollHeight || 0;
    }
  }, [curNotepad]);
  const handleNotepadChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurNotepad(e.target.value);
    },
    [setCurNotepad]
  );
  const notepadContainer = (
    <div className="notepad-container" style={props.style}>
      <textarea
        className="notepad"
        value={curNotepad}
        ref={notepadEl}
        spellCheck={false}
        style={props.style}
        onChange={handleNotepadChange}
      />
      <Button
        shape="circle"
        icon={<PlusOutlined />}
        type="primary"
        onClick={addPlay}
      />
    </div>
  );
  if (props.includeCard) {
    return (
      <Card
        title="Notepad"
        className="notepad-card"
        extra={
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            type="primary"
            onClick={addPlay}
          />
        }
      >
        {notepadContainer}
      </Card>
    );
  }
  return notepadContainer;
});
