// @generated by protoc-gen-es v1.10.0
// @generated from file vendor/macondo/macondo.proto (package macondo, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum macondo.PlayState
 */
export const PlayState = /*@__PURE__*/ proto3.makeEnum(
  "macondo.PlayState",
  [
    {no: 0, name: "PLAYING"},
    {no: 1, name: "WAITING_FOR_FINAL_PASS"},
    {no: 2, name: "GAME_OVER"},
  ],
);

/**
 * @generated from enum macondo.ChallengeRule
 */
export const ChallengeRule = /*@__PURE__*/ proto3.makeEnum(
  "macondo.ChallengeRule",
  [
    {no: 0, name: "VOID"},
    {no: 1, name: "SINGLE"},
    {no: 2, name: "DOUBLE"},
    {no: 3, name: "FIVE_POINT"},
    {no: 4, name: "TEN_POINT"},
    {no: 5, name: "TRIPLE"},
  ],
);

/**
 * @generated from enum macondo.PuzzleTag
 */
export const PuzzleTag = /*@__PURE__*/ proto3.makeEnum(
  "macondo.PuzzleTag",
  [
    {no: 0, name: "EQUITY"},
    {no: 1, name: "BINGO"},
    {no: 2, name: "ONLY_BINGO"},
    {no: 3, name: "BLANK_BINGO"},
    {no: 4, name: "NON_BINGO"},
    {no: 5, name: "POWER_TILE"},
    {no: 6, name: "BINGO_NINE_OR_ABOVE"},
    {no: 7, name: "CEL_ONLY"},
  ],
);

/**
 * GameHistory encodes a whole history of a game, and it should also encode
 * the initial board and tile configuration, etc. It can be considered
 * to be an instantiation of a GCG file.
 *
 * @generated from message macondo.GameHistory
 */
export const GameHistory = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.GameHistory",
  () => [
    { no: 1, name: "events", kind: "message", T: GameEvent, repeated: true },
    { no: 2, name: "players", kind: "message", T: PlayerInfo, repeated: true },
    { no: 3, name: "version", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "original_gcg", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "lexicon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "id_auth", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "uid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "last_known_racks", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 11, name: "second_went_first", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 12, name: "challenge_rule", kind: "enum", T: proto3.getEnumType(ChallengeRule) },
    { no: 13, name: "play_state", kind: "enum", T: proto3.getEnumType(PlayState) },
    { no: 14, name: "final_scores", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 15, name: "variant", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 16, name: "winner", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 17, name: "board_layout", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 18, name: "letter_distribution", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 19, name: "starting_cgp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * This should be merged into Move.
 *
 * @generated from message macondo.GameEvent
 */
export const GameEvent = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.GameEvent",
  () => [
    { no: 1, name: "nickname", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "rack", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "type", kind: "enum", T: proto3.getEnumType(GameEvent_Type) },
    { no: 5, name: "cumulative", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "row", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "column", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "direction", kind: "enum", T: proto3.getEnumType(GameEvent_Direction) },
    { no: 9, name: "position", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "played_tiles", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "exchanged", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 12, name: "score", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 13, name: "bonus", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 14, name: "end_rack_points", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 15, name: "lost_score", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 16, name: "is_bingo", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 17, name: "words_formed", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 18, name: "millis_remaining", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 19, name: "player_index", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 20, name: "num_tiles_from_rack", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ],
);

/**
 * @generated from enum macondo.GameEvent.Type
 */
export const GameEvent_Type = /*@__PURE__*/ proto3.makeEnum(
  "macondo.GameEvent.Type",
  [
    {no: 0, name: "TILE_PLACEMENT_MOVE"},
    {no: 1, name: "PHONY_TILES_RETURNED"},
    {no: 2, name: "PASS"},
    {no: 3, name: "CHALLENGE_BONUS"},
    {no: 4, name: "EXCHANGE"},
    {no: 5, name: "END_RACK_PTS"},
    {no: 6, name: "TIME_PENALTY"},
    {no: 7, name: "END_RACK_PENALTY"},
    {no: 8, name: "UNSUCCESSFUL_CHALLENGE_TURN_LOSS"},
    {no: 9, name: "CHALLENGE"},
  ],
);

/**
 * @generated from enum macondo.GameEvent.Direction
 */
export const GameEvent_Direction = /*@__PURE__*/ proto3.makeEnum(
  "macondo.GameEvent.Direction",
  [
    {no: 0, name: "HORIZONTAL"},
    {no: 1, name: "VERTICAL"},
  ],
);

/**
 * @generated from message macondo.PlayerInfo
 */
export const PlayerInfo = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.PlayerInfo",
  () => [
    { no: 1, name: "nickname", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "real_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message macondo.BotRequest
 */
export const BotRequest = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.BotRequest",
  () => [
    { no: 1, name: "game_history", kind: "message", T: GameHistory },
    { no: 2, name: "evaluation_request", kind: "message", T: EvaluationRequest },
    { no: 3, name: "bot_type", kind: "enum", T: proto3.getEnumType(BotRequest_BotCode) },
  ],
);

/**
 * @generated from enum macondo.BotRequest.BotCode
 */
export const BotRequest_BotCode = /*@__PURE__*/ proto3.makeEnum(
  "macondo.BotRequest.BotCode",
  [
    {no: 0, name: "HASTY_BOT"},
    {no: 1, name: "LEVEL1_CEL_BOT"},
    {no: 2, name: "LEVEL2_CEL_BOT"},
    {no: 3, name: "LEVEL3_CEL_BOT"},
    {no: 4, name: "LEVEL4_CEL_BOT"},
    {no: 5, name: "LEVEL1_PROBABILISTIC"},
    {no: 6, name: "LEVEL2_PROBABILISTIC"},
    {no: 7, name: "LEVEL3_PROBABILISTIC"},
    {no: 8, name: "LEVEL4_PROBABILISTIC"},
    {no: 9, name: "LEVEL5_PROBABILISTIC"},
    {no: 10, name: "NO_LEAVE_BOT"},
    {no: 11, name: "SIMMING_BOT"},
    {no: 12, name: "HASTY_PLUS_ENDGAME_BOT"},
    {no: 13, name: "SIMMING_INFER_BOT"},
    {no: 100, name: "UNKNOWN"},
  ],
);

/**
 * @generated from message macondo.EvaluationRequest
 */
export const EvaluationRequest = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.EvaluationRequest",
  () => [
    { no: 1, name: "user", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message macondo.Evaluation
 */
export const Evaluation = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.Evaluation",
  () => [
    { no: 1, name: "play_eval", kind: "message", T: SingleEvaluation, repeated: true },
  ],
);

/**
 * @generated from message macondo.SingleEvaluation
 */
export const SingleEvaluation = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.SingleEvaluation",
  () => [
    { no: 1, name: "equity_loss", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "win_pct_loss", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 3, name: "missed_bingo", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "possible_star_play", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "missed_star_play", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "top_is_bingo", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message macondo.BotResponse
 */
export const BotResponse = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.BotResponse",
  () => [
    { no: 1, name: "move", kind: "message", T: GameEvent, oneof: "response" },
    { no: 2, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "response" },
    { no: 3, name: "eval", kind: "message", T: Evaluation },
    { no: 4, name: "game_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message macondo.PuzzleCreationResponse
 */
export const PuzzleCreationResponse = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.PuzzleCreationResponse",
  () => [
    { no: 1, name: "game_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "turn_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "answer", kind: "message", T: GameEvent },
    { no: 4, name: "tags", kind: "enum", T: proto3.getEnumType(PuzzleTag), repeated: true },
    { no: 5, name: "bucket_index", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message macondo.PuzzleBucket
 */
export const PuzzleBucket = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.PuzzleBucket",
  () => [
    { no: 1, name: "index", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "size", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "includes", kind: "enum", T: proto3.getEnumType(PuzzleTag), repeated: true },
    { no: 4, name: "excludes", kind: "enum", T: proto3.getEnumType(PuzzleTag), repeated: true },
  ],
);

/**
 * @generated from message macondo.PuzzleGenerationRequest
 */
export const PuzzleGenerationRequest = /*@__PURE__*/ proto3.makeMessageType(
  "macondo.PuzzleGenerationRequest",
  () => [
    { no: 1, name: "buckets", kind: "message", T: PuzzleBucket, repeated: true },
  ],
);
