// @generated by protoc-gen-es v1.0.0
// @generated from file omgwords_service/omgwords.proto (package omgwords_service, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage, Timestamp } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { ChallengeRule, ClientGameplayEvent, GameDocument, GameRules, PlayerInfo } from "../ipc/omgwords_pb.js";

/**
 * GameEventResponse doesn't need to have any extra data. The GameEvent API
 * will still use sockets to broadcast game information.
 *
 * @generated from message omgwords_service.GameEventResponse
 */
export declare class GameEventResponse extends Message<GameEventResponse> {
  constructor(data?: PartialMessage<GameEventResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.GameEventResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GameEventResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GameEventResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GameEventResponse;

  static equals(a: GameEventResponse | PlainMessage<GameEventResponse> | undefined, b: GameEventResponse | PlainMessage<GameEventResponse> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.TimePenaltyEvent
 */
export declare class TimePenaltyEvent extends Message<TimePenaltyEvent> {
  /**
   * @generated from field: int32 points_lost = 1;
   */
  pointsLost: number;

  constructor(data?: PartialMessage<TimePenaltyEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.TimePenaltyEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TimePenaltyEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TimePenaltyEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TimePenaltyEvent;

  static equals(a: TimePenaltyEvent | PlainMessage<TimePenaltyEvent> | undefined, b: TimePenaltyEvent | PlainMessage<TimePenaltyEvent> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.ChallengeBonusPointsEvent
 */
export declare class ChallengeBonusPointsEvent extends Message<ChallengeBonusPointsEvent> {
  /**
   * @generated from field: int32 points_gained = 1;
   */
  pointsGained: number;

  constructor(data?: PartialMessage<ChallengeBonusPointsEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.ChallengeBonusPointsEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChallengeBonusPointsEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChallengeBonusPointsEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChallengeBonusPointsEvent;

  static equals(a: ChallengeBonusPointsEvent | PlainMessage<ChallengeBonusPointsEvent> | undefined, b: ChallengeBonusPointsEvent | PlainMessage<ChallengeBonusPointsEvent> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.CreateBroadcastGameRequest
 */
export declare class CreateBroadcastGameRequest extends Message<CreateBroadcastGameRequest> {
  /**
   * PlayerInfo for broadcast games do not need to be tied to a Woogles
   * UUID. These games are meant for sandbox/annotation/broadcast of
   * a typically IRL game. The order that the players are sent in
   * must be the order in which they play.
   *
   * @generated from field: repeated ipc.PlayerInfo players_info = 1;
   */
  playersInfo: PlayerInfo[];

  /**
   * The lexicon is a string such as NWL20, CSW21. It must be supported by
   * Woogles.
   *
   * @generated from field: string lexicon = 2;
   */
  lexicon: string;

  /**
   * @generated from field: ipc.GameRules rules = 3;
   */
  rules?: GameRules;

  /**
   * @generated from field: ipc.ChallengeRule challenge_rule = 4;
   */
  challengeRule: ChallengeRule;

  /**
   * public will make this game public upon creation - i.e., findable
   * within the interface. Otherwise, a game ID is required.
   * (Not yet implemented)
   *
   * @generated from field: bool public = 5;
   */
  public: boolean;

  constructor(data?: PartialMessage<CreateBroadcastGameRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.CreateBroadcastGameRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateBroadcastGameRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateBroadcastGameRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateBroadcastGameRequest;

  static equals(a: CreateBroadcastGameRequest | PlainMessage<CreateBroadcastGameRequest> | undefined, b: CreateBroadcastGameRequest | PlainMessage<CreateBroadcastGameRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.CreateBroadcastGameResponse
 */
export declare class CreateBroadcastGameResponse extends Message<CreateBroadcastGameResponse> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  constructor(data?: PartialMessage<CreateBroadcastGameResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.CreateBroadcastGameResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateBroadcastGameResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateBroadcastGameResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateBroadcastGameResponse;

  static equals(a: CreateBroadcastGameResponse | PlainMessage<CreateBroadcastGameResponse> | undefined, b: CreateBroadcastGameResponse | PlainMessage<CreateBroadcastGameResponse> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.BroadcastGamePrivacy
 */
export declare class BroadcastGamePrivacy extends Message<BroadcastGamePrivacy> {
  /**
   * @generated from field: bool public = 1;
   */
  public: boolean;

  constructor(data?: PartialMessage<BroadcastGamePrivacy>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.BroadcastGamePrivacy";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BroadcastGamePrivacy;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BroadcastGamePrivacy;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BroadcastGamePrivacy;

  static equals(a: BroadcastGamePrivacy | PlainMessage<BroadcastGamePrivacy> | undefined, b: BroadcastGamePrivacy | PlainMessage<BroadcastGamePrivacy> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.GetGamesForEditorRequest
 */
export declare class GetGamesForEditorRequest extends Message<GetGamesForEditorRequest> {
  /**
   * @generated from field: string user_id = 1;
   */
  userId: string;

  /**
   * @generated from field: uint32 limit = 2;
   */
  limit: number;

  /**
   * @generated from field: uint32 offset = 3;
   */
  offset: number;

  /**
   * @generated from field: bool unfinished = 4;
   */
  unfinished: boolean;

  constructor(data?: PartialMessage<GetGamesForEditorRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.GetGamesForEditorRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetGamesForEditorRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetGamesForEditorRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetGamesForEditorRequest;

  static equals(a: GetGamesForEditorRequest | PlainMessage<GetGamesForEditorRequest> | undefined, b: GetGamesForEditorRequest | PlainMessage<GetGamesForEditorRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.GetRecentAnnotatedGamesRequest
 */
export declare class GetRecentAnnotatedGamesRequest extends Message<GetRecentAnnotatedGamesRequest> {
  /**
   * @generated from field: uint32 limit = 1;
   */
  limit: number;

  /**
   * @generated from field: uint32 offset = 2;
   */
  offset: number;

  /**
   * @generated from field: bool unfinished = 3;
   */
  unfinished: boolean;

  constructor(data?: PartialMessage<GetRecentAnnotatedGamesRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.GetRecentAnnotatedGamesRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRecentAnnotatedGamesRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRecentAnnotatedGamesRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRecentAnnotatedGamesRequest;

  static equals(a: GetRecentAnnotatedGamesRequest | PlainMessage<GetRecentAnnotatedGamesRequest> | undefined, b: GetRecentAnnotatedGamesRequest | PlainMessage<GetRecentAnnotatedGamesRequest> | undefined): boolean;
}

/**
 * Assume we can never have so many unfinished games that we'd need limits and
 * offsets. Ideally we should only have one unfinished game per authed player at
 * a time.
 *
 * @generated from message omgwords_service.GetMyUnfinishedGamesRequest
 */
export declare class GetMyUnfinishedGamesRequest extends Message<GetMyUnfinishedGamesRequest> {
  constructor(data?: PartialMessage<GetMyUnfinishedGamesRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.GetMyUnfinishedGamesRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMyUnfinishedGamesRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMyUnfinishedGamesRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMyUnfinishedGamesRequest;

  static equals(a: GetMyUnfinishedGamesRequest | PlainMessage<GetMyUnfinishedGamesRequest> | undefined, b: GetMyUnfinishedGamesRequest | PlainMessage<GetMyUnfinishedGamesRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.BroadcastGamesResponse
 */
export declare class BroadcastGamesResponse extends Message<BroadcastGamesResponse> {
  /**
   * @generated from field: repeated omgwords_service.BroadcastGamesResponse.BroadcastGame games = 1;
   */
  games: BroadcastGamesResponse_BroadcastGame[];

  constructor(data?: PartialMessage<BroadcastGamesResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.BroadcastGamesResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BroadcastGamesResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BroadcastGamesResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BroadcastGamesResponse;

  static equals(a: BroadcastGamesResponse | PlainMessage<BroadcastGamesResponse> | undefined, b: BroadcastGamesResponse | PlainMessage<BroadcastGamesResponse> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.BroadcastGamesResponse.BroadcastGame
 */
export declare class BroadcastGamesResponse_BroadcastGame extends Message<BroadcastGamesResponse_BroadcastGame> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  /**
   * @generated from field: string creator_id = 2;
   */
  creatorId: string;

  /**
   * @generated from field: bool private = 3;
   */
  private: boolean;

  /**
   * @generated from field: bool finished = 4;
   */
  finished: boolean;

  /**
   * @generated from field: repeated ipc.PlayerInfo players_info = 5;
   */
  playersInfo: PlayerInfo[];

  /**
   * @generated from field: string lexicon = 6;
   */
  lexicon: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 7;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: string creator_username = 8;
   */
  creatorUsername: string;

  constructor(data?: PartialMessage<BroadcastGamesResponse_BroadcastGame>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.BroadcastGamesResponse.BroadcastGame";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BroadcastGamesResponse_BroadcastGame;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BroadcastGamesResponse_BroadcastGame;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BroadcastGamesResponse_BroadcastGame;

  static equals(a: BroadcastGamesResponse_BroadcastGame | PlainMessage<BroadcastGamesResponse_BroadcastGame> | undefined, b: BroadcastGamesResponse_BroadcastGame | PlainMessage<BroadcastGamesResponse_BroadcastGame> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.AnnotatedGameEvent
 */
export declare class AnnotatedGameEvent extends Message<AnnotatedGameEvent> {
  /**
   * event is the client gameplay event that represents a player's move.
   * A move can be a tile placement, a pass, an exchange, a challenge, or
   * a resign. Maybe other types in the future. This event is validated,
   * processed, and turned into one or more ipc.GameEvents, for storage
   * in a GameDocument.
   *
   * @generated from field: ipc.ClientGameplayEvent event = 1;
   */
  event?: ClientGameplayEvent;

  /**
   * The user_id for this gameplay event.
   *
   * @generated from field: string user_id = 2;
   */
  userId: string;

  /**
   * The event_number is ignored unless the amendment flag is on.
   *
   * @generated from field: uint32 event_number = 3;
   */
  eventNumber: number;

  /**
   * Amendment is ture if we are amending a previous, already played move.
   * In that case, the event number is the index of the event that we
   * wish to edit. Note: not every ClientGameplayEvent maps 1-to-1 with
   * internal event indexes. In order to be sure you are editing the right
   * event, you should fetch the latest version of the GameDocument first (use
   * the GetGameDocument call).
   *
   * @generated from field: bool amendment = 4;
   */
  amendment: boolean;

  constructor(data?: PartialMessage<AnnotatedGameEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.AnnotatedGameEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AnnotatedGameEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AnnotatedGameEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AnnotatedGameEvent;

  static equals(a: AnnotatedGameEvent | PlainMessage<AnnotatedGameEvent> | undefined, b: AnnotatedGameEvent | PlainMessage<AnnotatedGameEvent> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.GetGameDocumentRequest
 */
export declare class GetGameDocumentRequest extends Message<GetGameDocumentRequest> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  constructor(data?: PartialMessage<GetGameDocumentRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.GetGameDocumentRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetGameDocumentRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetGameDocumentRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetGameDocumentRequest;

  static equals(a: GetGameDocumentRequest | PlainMessage<GetGameDocumentRequest> | undefined, b: GetGameDocumentRequest | PlainMessage<GetGameDocumentRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.DeleteBroadcastGameRequest
 */
export declare class DeleteBroadcastGameRequest extends Message<DeleteBroadcastGameRequest> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  constructor(data?: PartialMessage<DeleteBroadcastGameRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.DeleteBroadcastGameRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteBroadcastGameRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteBroadcastGameRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteBroadcastGameRequest;

  static equals(a: DeleteBroadcastGameRequest | PlainMessage<DeleteBroadcastGameRequest> | undefined, b: DeleteBroadcastGameRequest | PlainMessage<DeleteBroadcastGameRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.DeleteBroadcastGameResponse
 */
export declare class DeleteBroadcastGameResponse extends Message<DeleteBroadcastGameResponse> {
  constructor(data?: PartialMessage<DeleteBroadcastGameResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.DeleteBroadcastGameResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteBroadcastGameResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteBroadcastGameResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteBroadcastGameResponse;

  static equals(a: DeleteBroadcastGameResponse | PlainMessage<DeleteBroadcastGameResponse> | undefined, b: DeleteBroadcastGameResponse | PlainMessage<DeleteBroadcastGameResponse> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.ReplaceDocumentRequest
 */
export declare class ReplaceDocumentRequest extends Message<ReplaceDocumentRequest> {
  /**
   * @generated from field: ipc.GameDocument document = 1;
   */
  document?: GameDocument;

  constructor(data?: PartialMessage<ReplaceDocumentRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.ReplaceDocumentRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReplaceDocumentRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReplaceDocumentRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReplaceDocumentRequest;

  static equals(a: ReplaceDocumentRequest | PlainMessage<ReplaceDocumentRequest> | undefined, b: ReplaceDocumentRequest | PlainMessage<ReplaceDocumentRequest> | undefined): boolean;
}

/**
 * @generated from message omgwords_service.PatchDocumentRequest
 */
export declare class PatchDocumentRequest extends Message<PatchDocumentRequest> {
  /**
   * @generated from field: ipc.GameDocument document = 1;
   */
  document?: GameDocument;

  constructor(data?: PartialMessage<PatchDocumentRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.PatchDocumentRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PatchDocumentRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PatchDocumentRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PatchDocumentRequest;

  static equals(a: PatchDocumentRequest | PlainMessage<PatchDocumentRequest> | undefined, b: PatchDocumentRequest | PlainMessage<PatchDocumentRequest> | undefined): boolean;
}

/**
 * SetRacksEvent is the event used for sending player racks.
 *
 * @generated from message omgwords_service.SetRacksEvent
 */
export declare class SetRacksEvent extends Message<SetRacksEvent> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  /**
   * racks are sent as byte arrays, in the same order as the players.
   * If you only have partial or unknown rack info, send a partial or
   * empty rack for that user.
   * Note: internally, every letter is represented by a single byte. The
   * letters A-Z map to 1-26, and the blank (?) maps to 0, for the English
   * letter distribution. For other letter distributions, the mapping orders
   * can be found in the letter distribution files in this repo.
   *
   * @generated from field: repeated bytes racks = 2;
   */
  racks: Uint8Array[];

  /**
   * The event_number is ignored unless the `amendment` flag is set.
   *
   * @generated from field: uint32 event_number = 3;
   */
  eventNumber: number;

  /**
   * `amendment` should be true if we are amending a previous, already played
   * rack. In that case, the event number is the index of the event whose
   * rack we wish to edit.
   *
   * @generated from field: bool amendment = 4;
   */
  amendment: boolean;

  constructor(data?: PartialMessage<SetRacksEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "omgwords_service.SetRacksEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetRacksEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetRacksEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetRacksEvent;

  static equals(a: SetRacksEvent | PlainMessage<SetRacksEvent> | undefined, b: SetRacksEvent | PlainMessage<SetRacksEvent> | undefined): boolean;
}
