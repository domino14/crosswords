// @generated by protoc-gen-es v2.2.0 with parameter "target=ts"
// @generated from file proto/omgwords_service/omgwords.proto (package omgwords_service, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { ChallengeRule, ClientGameplayEvent, GameDocument, GameDocumentSchema, GameRules, PlayerInfo } from "../ipc/omgwords_pb";
import { file_proto_ipc_omgwords } from "../ipc/omgwords_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file proto/omgwords_service/omgwords.proto.
 */
export const file_proto_omgwords_service_omgwords: GenFile = /*@__PURE__*/
  fileDesc("CiVwcm90by9vbWd3b3Jkc19zZXJ2aWNlL29tZ3dvcmRzLnByb3RvEhBvbWd3b3Jkc19zZXJ2aWNlIhMKEUdhbWVFdmVudFJlc3BvbnNlIicKEFRpbWVQZW5hbHR5RXZlbnQSEwoLcG9pbnRzX2xvc3QYASABKAUiMgoZQ2hhbGxlbmdlQm9udXNQb2ludHNFdmVudBIVCg1wb2ludHNfZ2FpbmVkGAEgASgFIq8BChpDcmVhdGVCcm9hZGNhc3RHYW1lUmVxdWVzdBIlCgxwbGF5ZXJzX2luZm8YASADKAsyDy5pcGMuUGxheWVySW5mbxIPCgdsZXhpY29uGAIgASgJEh0KBXJ1bGVzGAMgASgLMg4uaXBjLkdhbWVSdWxlcxIqCg5jaGFsbGVuZ2VfcnVsZRgEIAEoDjISLmlwYy5DaGFsbGVuZ2VSdWxlEg4KBnB1YmxpYxgFIAEoCCIuChtDcmVhdGVCcm9hZGNhc3RHYW1lUmVzcG9uc2USDwoHZ2FtZV9pZBgBIAEoCSJ7ChBJbXBvcnRHQ0dSZXF1ZXN0EgsKA2djZxgBIAEoCRIPCgdsZXhpY29uGAIgASgJEh0KBXJ1bGVzGAMgASgLMg4uaXBjLkdhbWVSdWxlcxIqCg5jaGFsbGVuZ2VfcnVsZRgEIAEoDjISLmlwYy5DaGFsbGVuZ2VSdWxlIiQKEUltcG9ydEdDR1Jlc3BvbnNlEg8KB2dhbWVfaWQYASABKAkiJgoUQnJvYWRjYXN0R2FtZVByaXZhY3kSDgoGcHVibGljGAEgASgIIl4KGEdldEdhbWVzRm9yRWRpdG9yUmVxdWVzdBIPCgd1c2VyX2lkGAEgASgJEg0KBWxpbWl0GAIgASgNEg4KBm9mZnNldBgDIAEoDRISCgp1bmZpbmlzaGVkGAQgASgIIlMKHkdldFJlY2VudEFubm90YXRlZEdhbWVzUmVxdWVzdBINCgVsaW1pdBgBIAEoDRIOCgZvZmZzZXQYAiABKA0SEgoKdW5maW5pc2hlZBgDIAEoCCIdChtHZXRNeVVuZmluaXNoZWRHYW1lc1JlcXVlc3QiuwIKFkJyb2FkY2FzdEdhbWVzUmVzcG9uc2USRQoFZ2FtZXMYASADKAsyNi5vbWd3b3Jkc19zZXJ2aWNlLkJyb2FkY2FzdEdhbWVzUmVzcG9uc2UuQnJvYWRjYXN0R2FtZRrZAQoNQnJvYWRjYXN0R2FtZRIPCgdnYW1lX2lkGAEgASgJEhIKCmNyZWF0b3JfaWQYAiABKAkSDwoHcHJpdmF0ZRgDIAEoCBIQCghmaW5pc2hlZBgEIAEoCBIlCgxwbGF5ZXJzX2luZm8YBSADKAsyDy5pcGMuUGxheWVySW5mbxIPCgdsZXhpY29uGAYgASgJEi4KCmNyZWF0ZWRfYXQYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEhgKEGNyZWF0b3JfdXNlcm5hbWUYCCABKAkidwoSQW5ub3RhdGVkR2FtZUV2ZW50EicKBWV2ZW50GAEgASgLMhguaXBjLkNsaWVudEdhbWVwbGF5RXZlbnQSDwoHdXNlcl9pZBgCIAEoCRIUCgxldmVudF9udW1iZXIYAyABKA0SEQoJYW1lbmRtZW50GAQgASgIIikKFkdldEdhbWVEb2N1bWVudFJlcXVlc3QSDwoHZ2FtZV9pZBgBIAEoCSItChpEZWxldGVCcm9hZGNhc3RHYW1lUmVxdWVzdBIPCgdnYW1lX2lkGAEgASgJIh0KG0RlbGV0ZUJyb2FkY2FzdEdhbWVSZXNwb25zZSI9ChZSZXBsYWNlRG9jdW1lbnRSZXF1ZXN0EiMKCGRvY3VtZW50GAEgASgLMhEuaXBjLkdhbWVEb2N1bWVudCI7ChRQYXRjaERvY3VtZW50UmVxdWVzdBIjCghkb2N1bWVudBgBIAEoCzIRLmlwYy5HYW1lRG9jdW1lbnQiIAoNR2V0Q0dQUmVxdWVzdBIPCgdnYW1lX2lkGAEgASgJIhoKC0NHUFJlc3BvbnNlEgsKA2NncBgBIAEoCSJYCg1TZXRSYWNrc0V2ZW50Eg8KB2dhbWVfaWQYASABKAkSDQoFcmFja3MYAiADKAwSFAoMZXZlbnRfbnVtYmVyGAMgASgNEhEKCWFtZW5kbWVudBgEIAEoCDKbCgoQR2FtZUV2ZW50U2VydmljZRJyChNDcmVhdGVCcm9hZGNhc3RHYW1lEiwub21nd29yZHNfc2VydmljZS5DcmVhdGVCcm9hZGNhc3RHYW1lUmVxdWVzdBotLm9tZ3dvcmRzX3NlcnZpY2UuQ3JlYXRlQnJvYWRjYXN0R2FtZVJlc3BvbnNlEnIKE0RlbGV0ZUJyb2FkY2FzdEdhbWUSLC5vbWd3b3Jkc19zZXJ2aWNlLkRlbGV0ZUJyb2FkY2FzdEdhbWVSZXF1ZXN0Gi0ub21nd29yZHNfc2VydmljZS5EZWxldGVCcm9hZGNhc3RHYW1lUmVzcG9uc2USWgoNU2VuZEdhbWVFdmVudBIkLm9tZ3dvcmRzX3NlcnZpY2UuQW5ub3RhdGVkR2FtZUV2ZW50GiMub21nd29yZHNfc2VydmljZS5HYW1lRXZlbnRSZXNwb25zZRJQCghTZXRSYWNrcxIfLm9tZ3dvcmRzX3NlcnZpY2UuU2V0UmFja3NFdmVudBojLm9tZ3dvcmRzX3NlcnZpY2UuR2FtZUV2ZW50UmVzcG9uc2USZAoTUmVwbGFjZUdhbWVEb2N1bWVudBIoLm9tZ3dvcmRzX3NlcnZpY2UuUmVwbGFjZURvY3VtZW50UmVxdWVzdBojLm9tZ3dvcmRzX3NlcnZpY2UuR2FtZUV2ZW50UmVzcG9uc2USYAoRUGF0Y2hHYW1lRG9jdW1lbnQSJi5vbWd3b3Jkc19zZXJ2aWNlLlBhdGNoRG9jdW1lbnRSZXF1ZXN0GiMub21nd29yZHNfc2VydmljZS5HYW1lRXZlbnRSZXNwb25zZRJmChdTZXRCcm9hZGNhc3RHYW1lUHJpdmFjeRImLm9tZ3dvcmRzX3NlcnZpY2UuQnJvYWRjYXN0R2FtZVByaXZhY3kaIy5vbWd3b3Jkc19zZXJ2aWNlLkdhbWVFdmVudFJlc3BvbnNlEmkKEUdldEdhbWVzRm9yRWRpdG9yEioub21nd29yZHNfc2VydmljZS5HZXRHYW1lc0ZvckVkaXRvclJlcXVlc3QaKC5vbWd3b3Jkc19zZXJ2aWNlLkJyb2FkY2FzdEdhbWVzUmVzcG9uc2USbwoUR2V0TXlVbmZpbmlzaGVkR2FtZXMSLS5vbWd3b3Jkc19zZXJ2aWNlLkdldE15VW5maW5pc2hlZEdhbWVzUmVxdWVzdBooLm9tZ3dvcmRzX3NlcnZpY2UuQnJvYWRjYXN0R2FtZXNSZXNwb25zZRJOCg9HZXRHYW1lRG9jdW1lbnQSKC5vbWd3b3Jkc19zZXJ2aWNlLkdldEdhbWVEb2N1bWVudFJlcXVlc3QaES5pcGMuR2FtZURvY3VtZW50EnUKF0dldFJlY2VudEFubm90YXRlZEdhbWVzEjAub21nd29yZHNfc2VydmljZS5HZXRSZWNlbnRBbm5vdGF0ZWRHYW1lc1JlcXVlc3QaKC5vbWd3b3Jkc19zZXJ2aWNlLkJyb2FkY2FzdEdhbWVzUmVzcG9uc2USSAoGR2V0Q0dQEh8ub21nd29yZHNfc2VydmljZS5HZXRDR1BSZXF1ZXN0Gh0ub21nd29yZHNfc2VydmljZS5DR1BSZXNwb25zZRJUCglJbXBvcnRHQ0cSIi5vbWd3b3Jkc19zZXJ2aWNlLkltcG9ydEdDR1JlcXVlc3QaIy5vbWd3b3Jkc19zZXJ2aWNlLkltcG9ydEdDR1Jlc3BvbnNlQr8BChRjb20ub21nd29yZHNfc2VydmljZUINT21nd29yZHNQcm90b1ABWjxnaXRodWIuY29tL3dvb2dsZXMtaW8vbGl3b3Jkcy9ycGMvYXBpL3Byb3RvL29tZ3dvcmRzX3NlcnZpY2WiAgNPWFiqAg9PbWd3b3Jkc1NlcnZpY2XKAg9PbWd3b3Jkc1NlcnZpY2XiAhtPbWd3b3Jkc1NlcnZpY2VcR1BCTWV0YWRhdGHqAg9PbWd3b3Jkc1NlcnZpY2ViBnByb3RvMw", [file_google_protobuf_timestamp, file_proto_ipc_omgwords]);

/**
 * GameEventResponse doesn't need to have any extra data. The GameEvent API
 * will still use sockets to broadcast game information.
 *
 * @generated from message omgwords_service.GameEventResponse
 */
export type GameEventResponse = Message<"omgwords_service.GameEventResponse"> & {
};

/**
 * Describes the message omgwords_service.GameEventResponse.
 * Use `create(GameEventResponseSchema)` to create a new message.
 */
export const GameEventResponseSchema: GenMessage<GameEventResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 0);

/**
 * @generated from message omgwords_service.TimePenaltyEvent
 */
export type TimePenaltyEvent = Message<"omgwords_service.TimePenaltyEvent"> & {
  /**
   * @generated from field: int32 points_lost = 1;
   */
  pointsLost: number;
};

/**
 * Describes the message omgwords_service.TimePenaltyEvent.
 * Use `create(TimePenaltyEventSchema)` to create a new message.
 */
export const TimePenaltyEventSchema: GenMessage<TimePenaltyEvent> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 1);

/**
 * @generated from message omgwords_service.ChallengeBonusPointsEvent
 */
export type ChallengeBonusPointsEvent = Message<"omgwords_service.ChallengeBonusPointsEvent"> & {
  /**
   * @generated from field: int32 points_gained = 1;
   */
  pointsGained: number;
};

/**
 * Describes the message omgwords_service.ChallengeBonusPointsEvent.
 * Use `create(ChallengeBonusPointsEventSchema)` to create a new message.
 */
export const ChallengeBonusPointsEventSchema: GenMessage<ChallengeBonusPointsEvent> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 2);

/**
 * @generated from message omgwords_service.CreateBroadcastGameRequest
 */
export type CreateBroadcastGameRequest = Message<"omgwords_service.CreateBroadcastGameRequest"> & {
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
};

/**
 * Describes the message omgwords_service.CreateBroadcastGameRequest.
 * Use `create(CreateBroadcastGameRequestSchema)` to create a new message.
 */
export const CreateBroadcastGameRequestSchema: GenMessage<CreateBroadcastGameRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 3);

/**
 * @generated from message omgwords_service.CreateBroadcastGameResponse
 */
export type CreateBroadcastGameResponse = Message<"omgwords_service.CreateBroadcastGameResponse"> & {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;
};

/**
 * Describes the message omgwords_service.CreateBroadcastGameResponse.
 * Use `create(CreateBroadcastGameResponseSchema)` to create a new message.
 */
export const CreateBroadcastGameResponseSchema: GenMessage<CreateBroadcastGameResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 4);

/**
 * @generated from message omgwords_service.ImportGCGRequest
 */
export type ImportGCGRequest = Message<"omgwords_service.ImportGCGRequest"> & {
  /**
   * @generated from field: string gcg = 1;
   */
  gcg: string;

  /**
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
};

/**
 * Describes the message omgwords_service.ImportGCGRequest.
 * Use `create(ImportGCGRequestSchema)` to create a new message.
 */
export const ImportGCGRequestSchema: GenMessage<ImportGCGRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 5);

/**
 * @generated from message omgwords_service.ImportGCGResponse
 */
export type ImportGCGResponse = Message<"omgwords_service.ImportGCGResponse"> & {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;
};

/**
 * Describes the message omgwords_service.ImportGCGResponse.
 * Use `create(ImportGCGResponseSchema)` to create a new message.
 */
export const ImportGCGResponseSchema: GenMessage<ImportGCGResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 6);

/**
 * @generated from message omgwords_service.BroadcastGamePrivacy
 */
export type BroadcastGamePrivacy = Message<"omgwords_service.BroadcastGamePrivacy"> & {
  /**
   * @generated from field: bool public = 1;
   */
  public: boolean;
};

/**
 * Describes the message omgwords_service.BroadcastGamePrivacy.
 * Use `create(BroadcastGamePrivacySchema)` to create a new message.
 */
export const BroadcastGamePrivacySchema: GenMessage<BroadcastGamePrivacy> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 7);

/**
 * @generated from message omgwords_service.GetGamesForEditorRequest
 */
export type GetGamesForEditorRequest = Message<"omgwords_service.GetGamesForEditorRequest"> & {
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
};

/**
 * Describes the message omgwords_service.GetGamesForEditorRequest.
 * Use `create(GetGamesForEditorRequestSchema)` to create a new message.
 */
export const GetGamesForEditorRequestSchema: GenMessage<GetGamesForEditorRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 8);

/**
 * @generated from message omgwords_service.GetRecentAnnotatedGamesRequest
 */
export type GetRecentAnnotatedGamesRequest = Message<"omgwords_service.GetRecentAnnotatedGamesRequest"> & {
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
};

/**
 * Describes the message omgwords_service.GetRecentAnnotatedGamesRequest.
 * Use `create(GetRecentAnnotatedGamesRequestSchema)` to create a new message.
 */
export const GetRecentAnnotatedGamesRequestSchema: GenMessage<GetRecentAnnotatedGamesRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 9);

/**
 * Assume we can never have so many unfinished games that we'd need limits and
 * offsets. Ideally we should only have one unfinished game per authed player at
 * a time.
 *
 * @generated from message omgwords_service.GetMyUnfinishedGamesRequest
 */
export type GetMyUnfinishedGamesRequest = Message<"omgwords_service.GetMyUnfinishedGamesRequest"> & {
};

/**
 * Describes the message omgwords_service.GetMyUnfinishedGamesRequest.
 * Use `create(GetMyUnfinishedGamesRequestSchema)` to create a new message.
 */
export const GetMyUnfinishedGamesRequestSchema: GenMessage<GetMyUnfinishedGamesRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 10);

/**
 * @generated from message omgwords_service.BroadcastGamesResponse
 */
export type BroadcastGamesResponse = Message<"omgwords_service.BroadcastGamesResponse"> & {
  /**
   * @generated from field: repeated omgwords_service.BroadcastGamesResponse.BroadcastGame games = 1;
   */
  games: BroadcastGamesResponse_BroadcastGame[];
};

/**
 * Describes the message omgwords_service.BroadcastGamesResponse.
 * Use `create(BroadcastGamesResponseSchema)` to create a new message.
 */
export const BroadcastGamesResponseSchema: GenMessage<BroadcastGamesResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 11);

/**
 * @generated from message omgwords_service.BroadcastGamesResponse.BroadcastGame
 */
export type BroadcastGamesResponse_BroadcastGame = Message<"omgwords_service.BroadcastGamesResponse.BroadcastGame"> & {
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
};

/**
 * Describes the message omgwords_service.BroadcastGamesResponse.BroadcastGame.
 * Use `create(BroadcastGamesResponse_BroadcastGameSchema)` to create a new message.
 */
export const BroadcastGamesResponse_BroadcastGameSchema: GenMessage<BroadcastGamesResponse_BroadcastGame> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 11, 0);

/**
 * @generated from message omgwords_service.AnnotatedGameEvent
 */
export type AnnotatedGameEvent = Message<"omgwords_service.AnnotatedGameEvent"> & {
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
   * Amendment is true if we are amending a previous, already played move.
   * In that case, the event number is the index of the event that we
   * wish to edit. Note: not every ClientGameplayEvent maps 1-to-1 with
   * internal event indexes. In order to be sure you are editing the right
   * event, you should fetch the latest version of the GameDocument first (use
   * the GetGameDocument call).
   *
   * @generated from field: bool amendment = 4;
   */
  amendment: boolean;
};

/**
 * Describes the message omgwords_service.AnnotatedGameEvent.
 * Use `create(AnnotatedGameEventSchema)` to create a new message.
 */
export const AnnotatedGameEventSchema: GenMessage<AnnotatedGameEvent> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 12);

/**
 * @generated from message omgwords_service.GetGameDocumentRequest
 */
export type GetGameDocumentRequest = Message<"omgwords_service.GetGameDocumentRequest"> & {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;
};

/**
 * Describes the message omgwords_service.GetGameDocumentRequest.
 * Use `create(GetGameDocumentRequestSchema)` to create a new message.
 */
export const GetGameDocumentRequestSchema: GenMessage<GetGameDocumentRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 13);

/**
 * @generated from message omgwords_service.DeleteBroadcastGameRequest
 */
export type DeleteBroadcastGameRequest = Message<"omgwords_service.DeleteBroadcastGameRequest"> & {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;
};

/**
 * Describes the message omgwords_service.DeleteBroadcastGameRequest.
 * Use `create(DeleteBroadcastGameRequestSchema)` to create a new message.
 */
export const DeleteBroadcastGameRequestSchema: GenMessage<DeleteBroadcastGameRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 14);

/**
 * @generated from message omgwords_service.DeleteBroadcastGameResponse
 */
export type DeleteBroadcastGameResponse = Message<"omgwords_service.DeleteBroadcastGameResponse"> & {
};

/**
 * Describes the message omgwords_service.DeleteBroadcastGameResponse.
 * Use `create(DeleteBroadcastGameResponseSchema)` to create a new message.
 */
export const DeleteBroadcastGameResponseSchema: GenMessage<DeleteBroadcastGameResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 15);

/**
 * @generated from message omgwords_service.ReplaceDocumentRequest
 */
export type ReplaceDocumentRequest = Message<"omgwords_service.ReplaceDocumentRequest"> & {
  /**
   * @generated from field: ipc.GameDocument document = 1;
   */
  document?: GameDocument;
};

/**
 * Describes the message omgwords_service.ReplaceDocumentRequest.
 * Use `create(ReplaceDocumentRequestSchema)` to create a new message.
 */
export const ReplaceDocumentRequestSchema: GenMessage<ReplaceDocumentRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 16);

/**
 * @generated from message omgwords_service.PatchDocumentRequest
 */
export type PatchDocumentRequest = Message<"omgwords_service.PatchDocumentRequest"> & {
  /**
   * @generated from field: ipc.GameDocument document = 1;
   */
  document?: GameDocument;
};

/**
 * Describes the message omgwords_service.PatchDocumentRequest.
 * Use `create(PatchDocumentRequestSchema)` to create a new message.
 */
export const PatchDocumentRequestSchema: GenMessage<PatchDocumentRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 17);

/**
 * @generated from message omgwords_service.GetCGPRequest
 */
export type GetCGPRequest = Message<"omgwords_service.GetCGPRequest"> & {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;
};

/**
 * Describes the message omgwords_service.GetCGPRequest.
 * Use `create(GetCGPRequestSchema)` to create a new message.
 */
export const GetCGPRequestSchema: GenMessage<GetCGPRequest> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 18);

/**
 * @generated from message omgwords_service.CGPResponse
 */
export type CGPResponse = Message<"omgwords_service.CGPResponse"> & {
  /**
   * @generated from field: string cgp = 1;
   */
  cgp: string;
};

/**
 * Describes the message omgwords_service.CGPResponse.
 * Use `create(CGPResponseSchema)` to create a new message.
 */
export const CGPResponseSchema: GenMessage<CGPResponse> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 19);

/**
 * SetRacksEvent is the event used for sending player racks.
 *
 * @generated from message omgwords_service.SetRacksEvent
 */
export type SetRacksEvent = Message<"omgwords_service.SetRacksEvent"> & {
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
};

/**
 * Describes the message omgwords_service.SetRacksEvent.
 * Use `create(SetRacksEventSchema)` to create a new message.
 */
export const SetRacksEventSchema: GenMessage<SetRacksEvent> = /*@__PURE__*/
  messageDesc(file_proto_omgwords_service_omgwords, 20);

/**
 * GameEventService will handle our game event API. We can connect bots to
 * this API, or use it for sandbox mode, or for live annotations, etc.
 *
 * @generated from service omgwords_service.GameEventService
 */
export const GameEventService: GenService<{
  /**
   * CreateBroadcastGame will create a game for Woogles broadcast
   *
   * @generated from rpc omgwords_service.GameEventService.CreateBroadcastGame
   */
  createBroadcastGame: {
    methodKind: "unary";
    input: typeof CreateBroadcastGameRequestSchema;
    output: typeof CreateBroadcastGameResponseSchema;
  },
  /**
   * DeleteBroadcastGame deletes a Woogles annotated game.
   *
   * @generated from rpc omgwords_service.GameEventService.DeleteBroadcastGame
   */
  deleteBroadcastGame: {
    methodKind: "unary";
    input: typeof DeleteBroadcastGameRequestSchema;
    output: typeof DeleteBroadcastGameResponseSchema;
  },
  /**
   * SendGameEvent is how one sends game events to the Woogles API.
   *
   * @generated from rpc omgwords_service.GameEventService.SendGameEvent
   */
  sendGameEvent: {
    methodKind: "unary";
    input: typeof AnnotatedGameEventSchema;
    output: typeof GameEventResponseSchema;
  },
  /**
   * SetRacks sets the rack for the players of the game.
   *
   * @generated from rpc omgwords_service.GameEventService.SetRacks
   */
  setRacks: {
    methodKind: "unary";
    input: typeof SetRacksEventSchema;
    output: typeof GameEventResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.ReplaceGameDocument
   */
  replaceGameDocument: {
    methodKind: "unary";
    input: typeof ReplaceDocumentRequestSchema;
    output: typeof GameEventResponseSchema;
  },
  /**
   * PatchGameDocument merges in the passed-in GameDocument with what's on the
   * server. The passed-in GameDocument should be a partial document
   *
   * @generated from rpc omgwords_service.GameEventService.PatchGameDocument
   */
  patchGameDocument: {
    methodKind: "unary";
    input: typeof PatchDocumentRequestSchema;
    output: typeof GameEventResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.SetBroadcastGamePrivacy
   */
  setBroadcastGamePrivacy: {
    methodKind: "unary";
    input: typeof BroadcastGamePrivacySchema;
    output: typeof GameEventResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.GetGamesForEditor
   */
  getGamesForEditor: {
    methodKind: "unary";
    input: typeof GetGamesForEditorRequestSchema;
    output: typeof BroadcastGamesResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.GetMyUnfinishedGames
   */
  getMyUnfinishedGames: {
    methodKind: "unary";
    input: typeof GetMyUnfinishedGamesRequestSchema;
    output: typeof BroadcastGamesResponseSchema;
  },
  /**
   * GetGameDocument fetches the latest GameDocument for the passed-in ID.
   *
   * @generated from rpc omgwords_service.GameEventService.GetGameDocument
   */
  getGameDocument: {
    methodKind: "unary";
    input: typeof GetGameDocumentRequestSchema;
    output: typeof GameDocumentSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.GetRecentAnnotatedGames
   */
  getRecentAnnotatedGames: {
    methodKind: "unary";
    input: typeof GetRecentAnnotatedGamesRequestSchema;
    output: typeof BroadcastGamesResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.GetCGP
   */
  getCGP: {
    methodKind: "unary";
    input: typeof GetCGPRequestSchema;
    output: typeof CGPResponseSchema;
  },
  /**
   * @generated from rpc omgwords_service.GameEventService.ImportGCG
   */
  importGCG: {
    methodKind: "unary";
    input: typeof ImportGCGRequestSchema;
    output: typeof ImportGCGResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_proto_omgwords_service_omgwords, 0);
