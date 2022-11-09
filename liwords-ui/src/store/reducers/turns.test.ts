import {
  GameEvent,
  GameEvent_Type,
} from '../../gen/macondo/api/proto/macondo/macondo_pb';
import { gameEventsToTurns } from './turns';

it('test turns simple', () => {
  const evt1 = new GameEvent({
    playerIndex: 1,
    rack: '?AEELRX',
    cumulative: 92,
    row: 7,
    column: 7,
    position: '8H',
    playedTiles: 'RELAXEs',
    score: 92,
  });

  const evt2 = new GameEvent({
    playerIndex: 1,
    type: GameEvent_Type.CHALLENGE_BONUS,
    cumulative: 97,
    bonus: 5,
  });

  const turns = gameEventsToTurns([evt1, evt2]);
  expect(turns).toStrictEqual([[evt1, evt2]]);
});

it('test turns simple 2', () => {
  const evt1 = new GameEvent({
    playerIndex: 1,
    rack: '?AEELRX',
    cumulative: 92,
    row: 7,
    column: 7,
    position: '8H',
    playedTiles: 'RELAXEs',
    score: 92,
  });

  const evt2 = new GameEvent({
    playerIndex: 1,
    type: GameEvent_Type.CHALLENGE_BONUS,
    cumulative: 97,
    bonus: 5,
  });

  const evt3 = new GameEvent({
    playerIndex: 0,
    rack: 'ABCDEFG',
    cumulative: 38,
    row: 6,
    column: 12,
    position: 'M7',
    playedTiles: 'F.EDBAG',
    score: 38,
  });

  const turns = gameEventsToTurns([evt1, evt2, evt3]);
  expect(turns.length).toBe(2);
  expect(turns).toStrictEqual([[evt1, evt2], [evt3]]);
});

it('test turns simple 3', () => {
  const evt1 = new GameEvent({
    playerIndex: 1,
    rack: '?AEELRX',
    cumulative: 92,
    row: 7,
    column: 7,
    position: '8H',
    playedTiles: 'RELAXEs',
    score: 92,
  });

  const evt2 = new GameEvent({
    playerIndex: 1,
    type: GameEvent_Type.CHALLENGE_BONUS,
    cumulative: 97,
    bonus: 5,
  });

  const evt3 = new GameEvent({
    playerIndex: 0,
    rack: 'ABCDEFG',
    cumulative: 40,
    row: 6,
    column: 12,
    position: 'M7',
    playedTiles: 'F.EDBAC',
    score: 40,
  });

  const evt4 = new GameEvent({
    playerIndex: 0,
    type: GameEvent_Type.PHONY_TILES_RETURNED,
    cumulative: 0,
  });

  const turns = gameEventsToTurns([evt1, evt2, evt3, evt4]);
  expect(turns.length).toBe(2);
  expect(turns).toStrictEqual([
    [evt1, evt2],
    [evt3, evt4],
  ]);
});
