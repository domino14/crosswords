import { GameEvent } from '../../gen/macondo/api/proto/macondo/macondo_pb';

export type Turn = Array<GameEvent>;

export const gameEventsToTurns = (evts: Array<GameEvent>) => {
  // Compute the turns based on the game events.
  const turns = new Array<Turn>();
  let lastTurn: Turn = new Array<GameEvent>();
  evts.forEach((evt) => {
    // XXX: remove when we get rid of nicknames fully
    let playersDiffer = false;
    if (lastTurn.length !== 0) {
      if (lastTurn[0].getNickname() !== '') {
        playersDiffer = lastTurn[0].getNickname() !== evt.getNickname();
      } else {
        playersDiffer = lastTurn[0].getPlayerIndex() !== evt.getPlayerIndex();
      }
    }
    if (
      (lastTurn.length !== 0 && playersDiffer) ||
      evt.getType() === GameEvent.Type.TIME_PENALTY ||
      evt.getType() === GameEvent.Type.END_RACK_PENALTY
    ) {
      // time to add a new turn.
      turns.push(lastTurn);
      lastTurn = new Array<GameEvent>();
    }
    lastTurn.push(evt);
  });
  if (lastTurn.length > 0) {
    turns.push(lastTurn);
  }
  return turns;
};
