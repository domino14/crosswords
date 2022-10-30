/** @fileoverview business logic for handling blindfold events */

export type BlindfoldCoordinates = {
  row: number;
  col: number;
  horizontal: boolean;
};

export const parseBlindfoldCoordinates = (
  coordinates: string
): BlindfoldCoordinates | undefined => {
  const horizontalRegex = /^([0-9][0-9]?)([A-U])$/;
  const matches = coordinates.match(horizontalRegex);
  let row = -1;
  let col = -1;
  let horizontal = false;
  if (matches && matches[1] !== undefined && matches[2] !== undefined) {
    row = parseInt(matches[1]) - 1;
    col = matches[2].charCodeAt(0) - 65;
    horizontal = true;
  } else {
    const verticalRegex = /^([A-U])([0-9][0-9]?)$/;
    const matches = coordinates.match(verticalRegex);
    if (matches && matches[1] !== undefined && matches[2] !== undefined) {
      row = parseInt(matches[2]) - 1;
      col = matches[1].charCodeAt(0) - 65;
      horizontal = false;
    }
  }
  if (row < 0) {
    return undefined;
  }
  return { row: row, col: col, horizontal: horizontal };
};
export const letterPronunciations = new Map([
  ['A', 'A'],
  ['B', 'B'],
  ['C', 'C'],
  ['D', 'D'],
  ['E', 'E'],
  ['F', 'F'],
  ['G', 'G'],
  ['H', 'H'],
  ['I', 'I'],
  ['J', 'J'],
  ['K', 'K'],
  ['L', 'L'],
  ['M', 'M'],
  ['N', 'N'],
  ['O', 'O'],
  ['P', 'P'],
  ['Q', 'Q'],
  ['R', 'R'],
  ['S', 'S'],
  ['T', 'T'],
  ['U', 'U'],
  ['V', 'V'],
  ['W', 'W'],
  ['X', 'X'],
  ['Y', 'Y'],
  ['Z', 'Z'],
]);

export const natoPhoneticAlphabet = new Map([
  ['A', 'Alpha'],
  ['B', 'Bravo'],
  ['C', 'Charlie'],
  ['D', 'Delta'],
  ['E', 'Echo'],
  ['F', 'Foxtrot'],
  ['G', 'Golf'],
  ['H', 'Hotel'],
  ['I', 'India'],
  ['J', 'Juliett'],
  ['K', 'Kilo'],
  ['L', 'Lima'],
  ['M', 'Mike'],
  ['N', 'November'],
  ['O', 'Oscar'],
  ['P', 'Papa'],
  ['Q', 'Quebec'],
  ['R', 'Romeo'],
  ['S', 'Sierra'],
  ['T', 'Tango'],
  ['U', 'Uniform'],
  ['V', 'Victor'],
  ['W', 'Whiskey'],
  ['X', 'X-ray'],
  ['Y', 'Yankee'],
  ['Z', 'Zulu'],
]);
