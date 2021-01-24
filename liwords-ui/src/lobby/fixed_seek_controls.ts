// Note: this is a TEMPORARY file. Once we add this ability to the tournament
// backend, we can remove this.

import { ChallengeRule } from '../gen/macondo/api/proto/macondo/macondo_pb';

type settings = { [key: string]: string | number | boolean };

const phillyvirtual = {
  lexicon: 'NWL20',
  challengerule: ChallengeRule.VOID,
  initialtime: 22, // Slider position is equivalent to 20 minutes.
  rated: true,
  extratime: 2,
  friend: '',
  incOrOT: 'overtime',
  vsBot: false,
};

const cococlub = {
  lexicon: 'CSW19',
  challengerule: ChallengeRule.FIVE_POINT,
  initialtime: 17, // 15 minutes
  rated: true,
  extratime: 1,
  friend: '',
  incOrOT: 'overtime',
  vsBot: false,
};

const laclub = {
  lexicon: 'NWL20',
  challengerule: ChallengeRule.DOUBLE,
  initialtime: 22, // 20 minutes
  rated: true,
  extratime: 3,
  friend: '',
  incOrOT: 'overtime',
  vsBot: false,
};

const madisonclub = {
  challengerule: ChallengeRule.FIVE_POINT,
  initialtime: 22, // 20 minutes
  rated: true,
  extratime: 1,
  friend: '',
  incOrOT: 'overtime',
  vsBot: false,
};

const wysc = {
  lexicon: 'CSW19',
  challengerule: ChallengeRule.SINGLE,
  initialtime: 17, // 15 minutes
  rated: true,
  extratime: 3,
  friend: '',
  incOrOT: 'overtime',
  vsBot: false,
};

export const fixedSettings: { [key: string]: settings } = {
  phillyvirtual,
  cococlub,
  madisonclub,
  '26VtG4JCfeD6qvSGJEwRLm': laclub,
  zgvv6NiShyGrMW6u77iu5n: wysc, // group a
  dFeYGcG7vXENujB5v8tQv5: wysc, // group b
  AMQ7jnA3NWzaTQuNwiEU9U: wysc, // group c
  '9Jujm6qBnUwkcePaXX5TsB': wysc, // group d
  T6TVX9rPfiUFB7x8vYkWgk: wysc, // brackets
};

// A temporary map of club redirects. Map internal tournament ID to slug:
export const clubRedirects: { [key: string]: string } = {
  channel275: '/club/channel275',
  phillyvirtual: '/club/phillyvirtual',
  madisonclub: '/club/madison',
  toucanet: '/club/toucanet',
  dallasbedford: '/club/dallasbedford',
  seattleclub: '/club/seattle',
  sfclub: '/club/sf',
  montrealscrabbleclub: '/club/montreal',
  vvsc: '/club/vvsc',
  OttawaClub: '/club/Ottawa',
  BrookfieldClub: '/club/Brookfield',
  RidgefieldClub: '/club/Ridgefield',
  HuaxiaScrabbleClub: '/club/Huaxia',
  WorkspaceScrabbleClub: '/club/Workspace',
  houstonclub: '/club/houston',
  pghscrabble: '/club/pgh',
  orlandoscrabble: '/club/orlando',
  CambridgeON: '/club/CambridgeON',
  delawareclub599: '/club/delawareclub599',
  scpnepal: '/club/scpnepal',
  uiscrabbleclub: '/club/ui',
  coloradosprings: '/club/coloradosprings',
  bridgewaterclub: '/club/bridgewater',
  cococlub: '/club/coco',
};
