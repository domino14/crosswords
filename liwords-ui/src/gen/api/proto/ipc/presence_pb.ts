// @generated by protoc-gen-es v2.2.0 with parameter "target=ts"
// @generated from file proto/ipc/presence.proto (package ipc, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file proto/ipc/presence.proto.
 */
export const file_proto_ipc_presence: GenFile = /*@__PURE__*/
  fileDesc("Chhwcm90by9pcGMvcHJlc2VuY2UucHJvdG8SA2lwYyJqCgxVc2VyUHJlc2VuY2USEAoIdXNlcm5hbWUYASABKAkSDwoHdXNlcl9pZBgCIAEoCRIPCgdjaGFubmVsGAMgASgJEhQKDGlzX2Fub255bW91cxgEIAEoCBIQCghkZWxldGluZxgFIAEoCCI1Cg1Vc2VyUHJlc2VuY2VzEiQKCXByZXNlbmNlcxgBIAMoCzIRLmlwYy5Vc2VyUHJlc2VuY2UiQwoNUHJlc2VuY2VFbnRyeRIQCgh1c2VybmFtZRgBIAEoCRIPCgd1c2VyX2lkGAIgASgJEg8KB2NoYW5uZWwYAyADKAlCdQoHY29tLmlwY0INUHJlc2VuY2VQcm90b1ABWi9naXRodWIuY29tL3dvb2dsZXMtaW8vbGl3b3Jkcy9ycGMvYXBpL3Byb3RvL2lwY6ICA0lYWKoCA0lwY8oCA0lwY+ICD0lwY1xHUEJNZXRhZGF0YeoCA0lwY2IGcHJvdG8z");

/**
 * @generated from message ipc.UserPresence
 */
export type UserPresence = Message<"ipc.UserPresence"> & {
  /**
   * @generated from field: string username = 1;
   */
  username: string;

  /**
   * @generated from field: string user_id = 2;
   */
  userId: string;

  /**
   * @generated from field: string channel = 3;
   */
  channel: string;

  /**
   * @generated from field: bool is_anonymous = 4;
   */
  isAnonymous: boolean;

  /**
   * @generated from field: bool deleting = 5;
   */
  deleting: boolean;
};

/**
 * Describes the message ipc.UserPresence.
 * Use `create(UserPresenceSchema)` to create a new message.
 */
export const UserPresenceSchema: GenMessage<UserPresence> = /*@__PURE__*/
  messageDesc(file_proto_ipc_presence, 0);

/**
 * @generated from message ipc.UserPresences
 */
export type UserPresences = Message<"ipc.UserPresences"> & {
  /**
   * @generated from field: repeated ipc.UserPresence presences = 1;
   */
  presences: UserPresence[];
};

/**
 * Describes the message ipc.UserPresences.
 * Use `create(UserPresencesSchema)` to create a new message.
 */
export const UserPresencesSchema: GenMessage<UserPresences> = /*@__PURE__*/
  messageDesc(file_proto_ipc_presence, 1);

/**
 * Only authenticated connections.
 *
 * @generated from message ipc.PresenceEntry
 */
export type PresenceEntry = Message<"ipc.PresenceEntry"> & {
  /**
   * @generated from field: string username = 1;
   */
  username: string;

  /**
   * @generated from field: string user_id = 2;
   */
  userId: string;

  /**
   * @generated from field: repeated string channel = 3;
   */
  channel: string[];
};

/**
 * Describes the message ipc.PresenceEntry.
 * Use `create(PresenceEntrySchema)` to create a new message.
 */
export const PresenceEntrySchema: GenMessage<PresenceEntry> = /*@__PURE__*/
  messageDesc(file_proto_ipc_presence, 2);
