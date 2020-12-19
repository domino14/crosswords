import { Action, ActionType } from '../../actions/actions';
import { GameInfoResponse } from '../../gen/api/proto/game_service/game_service_pb';
import {
  SeekRequest,
  RatingMode,
  MatchRequest,
  MatchUser,
  TournamentGameEndedEvent,
} from '../../gen/api/proto/realtime/realtime_pb';
import { RecentGame } from '../../tournament/recent_game';

export type SoughtGame = {
  seeker: string;
  lexicon: string;
  initialTimeSecs: number;
  incrementSecs: number;
  maxOvertimeMinutes: number;
  challengeRule: number;
  userRating: string;
  rated: boolean;
  seekID: string;
  playerVsBot: boolean;
  // Only for direct match requests:
  receiver: MatchUser;
  rematchFor: string;
  tournamentID: string;
};

type playerMeta = {
  rating: string;
  displayName: string;
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
};

export type LobbyState = {
  soughtGames: Array<SoughtGame>;
  matchRequests: Array<SoughtGame>;
  // + Other things in the lobby here that have state.
  activeGames: Array<ActiveGame>;

  tourneyGames: Array<RecentGame>;
  gamesPageSize: number;
  gamesOffset: number;
};

const toResultStr = (r: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
  return {
    0: 'NO_RESULT',
    1: 'WIN',
    2: 'LOSS',
    3: 'DRAW',
    4: 'BYE',
    5: 'FORFEIT_WIN',
    6: 'FORFEIT_LOSS',
    7: 'ELIMINATED',
  }[r];
};

const toEndReason = (r: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
  return {
    0: 'NONE',
    1: 'TIME',
    2: 'STANDARD',
    3: 'CONSECUTIVE_ZEROES',
    4: 'RESIGNED',
    5: 'ABORTED',
    6: 'TRIPLE_CHALLENGE',
    7: 'CANCELLED',
    8: 'FORCE_FORFEIT',
  }[r];
};

export const TourneyGameEndedEvtToRecentGame = (
  evt: TournamentGameEndedEvent
): RecentGame => {
  const evtPlayers = evt.getPlayersList();

  const players = evtPlayers.map((ep) => ({
    username: ep.getUsername(),
    score: ep.getScore(),
    result: toResultStr(ep.getResult()),
  }));

  return {
    players,
    end_reason: toEndReason(evt.getEndReason()),
    game_id: evt.getGameId(),
    time: evt.getTime(),
  };
};

export const SeekRequestToSoughtGame = (
  req: SeekRequest | MatchRequest
): SoughtGame | null => {
  const gameReq = req.getGameRequest();
  const user = req.getUser();
  if (!gameReq || !user) {
    return null;
  }

  let receivingUser = new MatchUser();
  let rematchFor = '';
  let tournamentID = '';
  if (req instanceof MatchRequest) {
    console.log('ismatchrequest');
    receivingUser = req.getReceivingUser()!;
    rematchFor = req.getRematchFor();
    tournamentID = req.getTournamentId();
  }

  return {
    seeker: user.getDisplayName(),
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
  }));

  if (!gameReq) {
    return null;
  }

  let variant = gameReq.getRules()?.getVariantName();
  if (!variant) {
    variant = gameReq.getRules()?.getBoardLayoutName()!;
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
  };
};

export function LobbyReducer(state: LobbyState, action: Action): LobbyState {
  switch (action.actionType) {
    case ActionType.AddSoughtGame: {
      const { soughtGames } = state;
      const soughtGame = action.payload as SoughtGame;
      return {
        ...state,
        soughtGames: [...soughtGames, soughtGame],
      };
    }

    case ActionType.RemoveSoughtGame: {
      // Look for match requests too.
      const { soughtGames, matchRequests } = state;
      const id = action.payload as string;

      const newSought = soughtGames.filter((sg) => {
        return sg.seekID !== id;
      });
      const newMatch = matchRequests.filter((mr) => {
        return mr.seekID !== id;
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
      soughtGames.sort((a, b) => {
        return a.userRating < b.userRating ? -1 : 1;
      });
      return {
        ...state,
        soughtGames,
      };
    }

    case ActionType.AddMatchRequest: {
      const { matchRequests } = state;
      const matchRequest = action.payload as SoughtGame;

      // it's a match request; put new ones on top.
      return {
        ...state,
        matchRequests: [matchRequest, ...matchRequests],
      };
    }

    case ActionType.AddMatchRequests: {
      const matchRequests = action.payload as Array<SoughtGame>;
      // These are match requests.
      console.log('matchRequests', matchRequests);
      matchRequests.sort((a, b) => {
        return a.userRating < b.userRating ? -1 : 1;
      });
      return {
        ...state,
        matchRequests,
      };
    }

    case ActionType.AddActiveGames: {
      const activeGames = action.payload as Array<ActiveGame>;
      return {
        ...state,
        activeGames,
      };
    }

    case ActionType.AddActiveGame: {
      const { activeGames } = state;
      const activeGame = action.payload as ActiveGame;
      return {
        ...state,
        activeGames: [...activeGames, activeGame],
      };
    }

    case ActionType.RemoveActiveGame: {
      const { activeGames } = state;
      const id = action.payload as string;

      const newArr = activeGames.filter((ag) => {
        return ag.gameID !== id;
      });

      return {
        ...state,
        activeGames: newArr,
      };
    }

    case ActionType.AddTourneyGame: {
      const { tourneyGames, gamesOffset, gamesPageSize } = state;
      const evt = action.payload as TournamentGameEndedEvent;
      const game = TourneyGameEndedEvtToRecentGame(evt);
      // If a tourney game comes in while we're looking at another page,
      // do nothing.
      if (gamesOffset > 0) {
        return state;
      }

      // Bring newest game to the top.
      const newGames = [game, ...tourneyGames];
      if (newGames.length > gamesPageSize) {
        newGames.length = gamesPageSize;
      }

      return {
        ...state,
        tourneyGames: newGames,
      };
    }

    case ActionType.AddTourneyGames: {
      const tourneyGames = action.payload as Array<RecentGame>;
      return {
        ...state,
        tourneyGames,
      };
    }

    case ActionType.SetTourneyGamesOffset: {
      const offset = action.payload as number;
      return {
        ...state,
        gamesOffset: offset,
      };
    }
  }
  throw new Error(`unhandled action type ${action.actionType}`);
}
