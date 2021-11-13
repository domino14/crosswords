import { Action, ActionType } from '../../actions/actions';
import { GameInfoResponse } from '../../gen/api/proto/game_service/game_service_pb';
import {
  SeekRequest,
  RatingMode,
  MatchUser,
} from '../../gen/api/proto/realtime/realtime_pb';
import { BotTypesEnum } from '../../lobby/bots';

export type SoughtGame = {
  seeker: string;
  seekerID?: string;
  lexicon: string;
  initialTimeSecs: number;
  incrementSecs: number;
  maxOvertimeMinutes: number;
  challengeRule: number;
  userRating: string;
  rated: boolean;
  seekID: string;
  playerVsBot: boolean;
  botType: BotTypesEnum;
  variant: string;
  // Only for direct match requests:
  receiver: MatchUser;
  rematchFor: string;
  tournamentID: string;
  receiverIsPermanent: boolean;
  // Optionally keep a copy of the binary for accepting
  originalRequest?: Uint8Array;
};

type playerMeta = {
  rating: string;
  displayName: string;
  uuid?: string;
};

export type ActiveGame = {
  lexicon: string;
  variant: string;
  initialTimeSecs: number;
  incrementSecs: number;
  challengeRule: number;
  rated: boolean;
  maxOvertimeMinutes: number;
  gameID: string;
  players: Array<playerMeta>;
  tournamentID: string;
  tournamentDivision: string;
  tournamentRound: number;
  tournamentGameIndex: number;
};

export type LobbyState = {
  soughtGames: Array<SoughtGame>;
  matchRequests: Array<SoughtGame>;
  // + Other things in the lobby here that have state.
  activeGames: Array<ActiveGame>;
};

export const SeekRequestToSoughtGame = (
  req: SeekRequest
): SoughtGame | null => {
  const gameReq = req.getGameRequest();
  const user = req.getUser();
  if (!gameReq || !user) {
    return null;
  }

  let receivingUser = new MatchUser();
  let rematchFor = '';
  let tournamentID = '';
  if (req.getReceiverIsPermanent()) {
    console.log('ismatchrequest');
    receivingUser = req.getReceivingUser()!;
    rematchFor = req.getRematchFor();
    tournamentID = req.getTournamentId();
  }

  return {
    seeker: user.getDisplayName(),
    seekerID: user.getUserId(),
    userRating: user.getRelevantRating(),
    lexicon: gameReq.getLexicon(),
    initialTimeSecs: gameReq.getInitialTimeSeconds(),
    challengeRule: gameReq.getChallengeRule(),
    seekID: gameReq.getRequestId(),
    rated: gameReq.getRatingMode() === RatingMode.RATED,
    maxOvertimeMinutes: gameReq.getMaxOvertimeMinutes(),
    receiver: receivingUser,
    rematchFor,
    incrementSecs: gameReq.getIncrementSeconds(),
    playerVsBot: gameReq.getPlayerVsBot(),
    tournamentID,
    variant: gameReq.getRules()?.getVariantName() || '',
    receiverIsPermanent: req.getReceiverIsPermanent(),
    // this is inconsequential as bot match requests are never shown
    // to the user. change if this becomes the case some day.
    botType: 0,
    originalRequest: req.serializeBinary(),
  };
};

export const GameInfoResponseToActiveGame = (
  gi: GameInfoResponse
): ActiveGame | null => {
  const users = gi.getPlayersList();
  const gameReq = gi.getGameRequest();
  const players = users.map((um) => ({
    rating: um.getRating(),
    displayName: um.getNickname(),
    uuid: um.getUserId(),
  }));

  if (!gameReq) {
    return null;
  }
  let variant = gameReq.getRules()?.getVariantName();
  if (!variant) {
    variant = 'classic';
  }
  return {
    players,
    lexicon: gameReq.getLexicon(),
    variant,
    initialTimeSecs: gameReq.getInitialTimeSeconds(),
    challengeRule: gameReq.getChallengeRule(),
    rated: gameReq.getRatingMode() === RatingMode.RATED,
    maxOvertimeMinutes: gameReq.getMaxOvertimeMinutes(),
    gameID: gi.getGameId(),
    incrementSecs: gameReq.getIncrementSeconds(),
    tournamentID: gi.getTournamentId(),
    tournamentDivision: gi.getTournamentDivision(),
    tournamentRound: gi.getTournamentRound(),
    tournamentGameIndex: gi.getTournamentGameIndex(),
  };
};

export function LobbyReducer(state: LobbyState, action: Action): LobbyState {
  switch (action.actionType) {
    case ActionType.AddSoughtGame: {
      const soughtGame = action.payload as SoughtGame;
      console.log('sg: ', soughtGame);
      if (!soughtGame.receiverIsPermanent) {
        const existingSoughtGames = state.soughtGames.filter((sg) => {
          return sg.seekID !== soughtGame.seekID;
        });
        return {
          ...state,
          soughtGames: [...existingSoughtGames, soughtGame],
        };
      } else {
        const existingMatchRequests = state.matchRequests.filter((sg) => {
          return sg.seekID !== soughtGame.seekID;
        });
        return {
          ...state,
          matchRequests: [...existingMatchRequests, soughtGame],
        };
      }
    }

    case ActionType.RemoveSoughtGame: {
      // Look for match requests too.
      const { soughtGames, matchRequests } = state;
      const id = action.payload as string;

      const newSought = soughtGames.filter((sg) => {
        return sg.seekID !== id && !sg.receiverIsPermanent;
      });
      const newMatch = matchRequests.filter((sg) => {
        return sg.seekID !== id && sg.receiverIsPermanent;
      });

      return {
        ...state,
        soughtGames: newSought,
        matchRequests: newMatch,
      };
    }

    case ActionType.AddSoughtGames: {
      const soughtGames = action.payload as Array<SoughtGame>;
      console.log('soughtGames', soughtGames);

      const seeks: SoughtGame[] = [];
      const matches: SoughtGame[] = [];

      soughtGames.forEach(function (sg) {
        if (sg.receiverIsPermanent) {
          matches.push(sg);
        } else {
          seeks.push(sg);
        }
      });

      seeks.sort((a, b) => {
        return a.userRating < b.userRating ? -1 : 1;
      });
      matches.sort((a, b) => {
        return a.userRating < b.userRating ? -1 : 1;
      });

      return {
        ...state,
        soughtGames: seeks,
        matchRequests: matches,
      };
    }

    case ActionType.AddActiveGames: {
      const p = action.payload as {
        activeGames: Array<ActiveGame>;
      };
      return {
        ...state,
        activeGames: p.activeGames,
      };
    }

    case ActionType.AddActiveGame: {
      const { activeGames } = state;
      const p = action.payload as {
        activeGame: ActiveGame;
      };
      return {
        ...state,
        activeGames: [...activeGames, p.activeGame],
      };
    }

    case ActionType.RemoveActiveGame: {
      const { activeGames } = state;
      const g = action.payload as string;

      const newArr = activeGames.filter((ag) => {
        return ag.gameID !== g;
      });

      return {
        ...state,
        activeGames: newArr,
      };
    }
  }
  throw new Error(`unhandled action type ${action.actionType}`);
}
