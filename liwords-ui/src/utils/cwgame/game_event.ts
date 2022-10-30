import { EphemeralTile, Direction, Blank, EmptySpace, isBlank } from './common';
import { contiguousTilesFromTileSet } from './scoring';
import { Board } from './board';
import { GameEvent } from '../../gen/macondo/api/proto/macondo/macondo_pb';
import { ClientGameplayEvent } from '../../gen/api/proto/ipc/omgwords_pb';
import { PlayerMetadata } from '../../gameroom/game_info';
import { indexToPlayerOrder, PlayerOrder } from '../../store/constants';

export const ThroughTileMarker = '.';
// convert a set of ephemeral tiles to a protobuf game event.
export const tilesetToMoveEvent = (
  tiles: Set<EphemeralTile>,
  board: Board,
  gameID: string
) => {
  const ret = contiguousTilesFromTileSet(tiles, board);
  if (ret === null) {
    // the play is not rules-valid. Deal with it in the caller.
    return null;
  }

  const [wordTiles, wordDir] = ret;
  let wordStr = '';
  let wordPos = '';
  let undesignatedBlank = false;
  wordTiles.forEach((t) => {
    wordStr += t.fresh ? t.letter : ThroughTileMarker;
    if (t.letter === Blank) {
      undesignatedBlank = true;
    }
  });
  if (undesignatedBlank) {
    // Play has an undesignated blank. Not valid.
    console.log('Undesignated blank');
    return null;
  }
  const row = String(wordTiles[0].row + 1);
  const col = String.fromCharCode(wordTiles[0].col + 'A'.charCodeAt(0));

  if (wordDir === Direction.Horizontal) {
    wordPos = row + col;
  } else {
    wordPos = col + row;
  }

  const evt = new ClientGameplayEvent();
  evt.setPositionCoords(wordPos);
  evt.setTiles(wordStr);
  evt.setType(ClientGameplayEvent.EventType.TILE_PLACEMENT);
  evt.setGameId(gameID);
  return evt;
};

export const exchangeMoveEvent = (rack: string, gameID: string) => {
  const evt = new ClientGameplayEvent();
  evt.setTiles(rack);
  evt.setType(ClientGameplayEvent.EventType.EXCHANGE);
  evt.setGameId(gameID);

  return evt;
};

export const passMoveEvent = (gameID: string) => {
  const evt = new ClientGameplayEvent();
  evt.setType(ClientGameplayEvent.EventType.PASS);
  evt.setGameId(gameID);

  return evt;
};

export const resignMoveEvent = (gameID: string) => {
  const evt = new ClientGameplayEvent();
  evt.setType(ClientGameplayEvent.EventType.RESIGN);
  evt.setGameId(gameID);

  return evt;
};

export const challengeMoveEvent = (gameID: string) => {
  const evt = new ClientGameplayEvent();
  evt.setType(ClientGameplayEvent.EventType.CHALLENGE_PLAY);
  evt.setGameId(gameID);

  return evt;
};

export const tilePlacementEventDisplay = (evt: GameEvent, board: Board) => {
  // modify a tile placement move for display purposes.
  const row = evt.getRow();
  const col = evt.getColumn();
  const ri = evt.getDirection() === GameEvent.Direction.HORIZONTAL ? 0 : 1;
  const ci = 1 - ri;

  let m = '';
  let openParen = false;
  for (
    let i = 0, r = row, c = col;
    i < evt.getPlayedTiles().length;
    i += 1, r += ri, c += ci
  ) {
    const t = evt.getPlayedTiles()[i];
    if (t === ThroughTileMarker) {
      if (!openParen) {
        m += '(';
        openParen = true;
      }
      m += board.letterAt(r, c);
    } else {
      if (openParen) {
        m += ')';
        openParen = false;
      }
      m += t;
    }
  }
  if (openParen) {
    m += ')';
  }
  return m;
};

// nicknameFromEvt gets the nickname of the user who performed an
// event.
// XXX: Remove the `evt.getNickname()` part of this once we migrate all games
// over to use playerIndex.
export const nicknameFromEvt = (
  evt: GameEvent,
  players: Array<PlayerMetadata>
): string => {
  return evt.getNickname() || players[evt.getPlayerIndex()]?.nickname;
};

// playerOrderFromEvt gets the player order from the event. (p0 | p1 etc)
// XXX: Remove the nickname logic from this once we migrate games to use
// playerIndex only.
export const playerOrderFromEvt = (
  evt: GameEvent,
  nickToPlayerOrder: { [nick: string]: PlayerOrder }
): PlayerOrder => {
  const nickname = evt.getNickname();
  if (nickname) {
    return nickToPlayerOrder[nickname];
  }
  return indexToPlayerOrder(evt.getPlayerIndex());
};

export const computeLeave = (tilesPlayed: string, rack: string) => {
  // tilesPlayed is either from evt.getPlayedTiles(), which is like "TRUNCa.E",
  // or from evt.getExchanged(), which is like "AE?".
  // rack is a pre-sorted rack; spaces will be returned where gaps should be.

  const leave: Array<string | null> = Array.from(rack);
  for (const letter of tilesPlayed) {
    if (letter !== ThroughTileMarker) {
      const t = isBlank(letter) ? Blank : letter;
      const usedTileIndex = leave.lastIndexOf(t);
      if (usedTileIndex >= 0) {
        // make it a non-string to disqualify multiple matches in this loop.
        leave[usedTileIndex] = null;
      }
    }
  }
  for (let i = 0; i < leave.length; ++i) {
    if (leave[i] === null) {
      // this is intentionally done in a separate pass.
      leave[i] = EmptySpace;
    }
  }
  return leave.join('');
};
