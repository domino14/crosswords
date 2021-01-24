// package: user_service
// file: api/proto/user_service/user_service.proto

import * as jspb from "google-protobuf";
import * as api_proto_realtime_realtime_pb from "../../../api/proto/realtime/realtime_pb";

export class UserLoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserLoginRequest): UserLoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLoginRequest;
  static deserializeBinaryFromReader(message: UserLoginRequest, reader: jspb.BinaryReader): UserLoginRequest;
}

export namespace UserLoginRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class ChangePasswordRequest extends jspb.Message {
  getOldPassword(): string;
  setOldPassword(value: string): void;

  getNewPassword(): string;
  setNewPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    oldPassword: string,
    newPassword: string,
  }
}

export class LoginResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getSessionId(): string;
  setSessionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    message: string,
    sessionId: string,
  }
}

export class ChangePasswordResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordResponse): ChangePasswordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordResponse;
  static deserializeBinaryFromReader(message: ChangePasswordResponse, reader: jspb.BinaryReader): ChangePasswordResponse;
}

export namespace ChangePasswordResponse {
  export type AsObject = {
  }
}

export class ResetPasswordRequestStep1 extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetPasswordRequestStep1.AsObject;
  static toObject(includeInstance: boolean, msg: ResetPasswordRequestStep1): ResetPasswordRequestStep1.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetPasswordRequestStep1, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetPasswordRequestStep1;
  static deserializeBinaryFromReader(message: ResetPasswordRequestStep1, reader: jspb.BinaryReader): ResetPasswordRequestStep1;
}

export namespace ResetPasswordRequestStep1 {
  export type AsObject = {
    email: string,
  }
}

export class ResetPasswordRequestStep2 extends jspb.Message {
  getPassword(): string;
  setPassword(value: string): void;

  getResetCode(): string;
  setResetCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetPasswordRequestStep2.AsObject;
  static toObject(includeInstance: boolean, msg: ResetPasswordRequestStep2): ResetPasswordRequestStep2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetPasswordRequestStep2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetPasswordRequestStep2;
  static deserializeBinaryFromReader(message: ResetPasswordRequestStep2, reader: jspb.BinaryReader): ResetPasswordRequestStep2;
}

export namespace ResetPasswordRequestStep2 {
  export type AsObject = {
    password: string,
    resetCode: string,
  }
}

export class ResetPasswordResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetPasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResetPasswordResponse): ResetPasswordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetPasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetPasswordResponse;
  static deserializeBinaryFromReader(message: ResetPasswordResponse, reader: jspb.BinaryReader): ResetPasswordResponse;
}

export namespace ResetPasswordResponse {
  export type AsObject = {
  }
}

export class SocketTokenRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SocketTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SocketTokenRequest): SocketTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SocketTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SocketTokenRequest;
  static deserializeBinaryFromReader(message: SocketTokenRequest, reader: jspb.BinaryReader): SocketTokenRequest;
}

export namespace SocketTokenRequest {
  export type AsObject = {
  }
}

export class SocketTokenResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  getCid(): string;
  setCid(value: string): void;

  getFrontEndVersion(): string;
  setFrontEndVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SocketTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SocketTokenResponse): SocketTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SocketTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SocketTokenResponse;
  static deserializeBinaryFromReader(message: SocketTokenResponse, reader: jspb.BinaryReader): SocketTokenResponse;
}

export namespace SocketTokenResponse {
  export type AsObject = {
    token: string,
    cid: string,
    frontEndVersion: string,
  }
}

export class UserLogoutRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLogoutRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserLogoutRequest): UserLogoutRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLogoutRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLogoutRequest;
  static deserializeBinaryFromReader(message: UserLogoutRequest, reader: jspb.BinaryReader): UserLogoutRequest;
}

export namespace UserLogoutRequest {
  export type AsObject = {
  }
}

export class LogoutResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogoutResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LogoutResponse): LogoutResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LogoutResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogoutResponse;
  static deserializeBinaryFromReader(message: LogoutResponse, reader: jspb.BinaryReader): LogoutResponse;
}

export namespace LogoutResponse {
  export type AsObject = {
  }
}

export class UserRegistrationRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getRegistrationCode(): string;
  setRegistrationCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRegistrationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRegistrationRequest): UserRegistrationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRegistrationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRegistrationRequest;
  static deserializeBinaryFromReader(message: UserRegistrationRequest, reader: jspb.BinaryReader): UserRegistrationRequest;
}

export namespace UserRegistrationRequest {
  export type AsObject = {
    username: string,
    password: string,
    email: string,
    registrationCode: string,
  }
}

export class RegistrationResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegistrationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegistrationResponse): RegistrationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegistrationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegistrationResponse;
  static deserializeBinaryFromReader(message: RegistrationResponse, reader: jspb.BinaryReader): RegistrationResponse;
}

export namespace RegistrationResponse {
  export type AsObject = {
    message: string,
  }
}

export class RatingsRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RatingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RatingsRequest): RatingsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RatingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RatingsRequest;
  static deserializeBinaryFromReader(message: RatingsRequest, reader: jspb.BinaryReader): RatingsRequest;
}

export namespace RatingsRequest {
  export type AsObject = {
    username: string,
  }
}

export class RatingsResponse extends jspb.Message {
  getJson(): string;
  setJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RatingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RatingsResponse): RatingsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RatingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RatingsResponse;
  static deserializeBinaryFromReader(message: RatingsResponse, reader: jspb.BinaryReader): RatingsResponse;
}

export namespace RatingsResponse {
  export type AsObject = {
    json: string,
  }
}

export class StatsRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatsRequest): StatsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatsRequest;
  static deserializeBinaryFromReader(message: StatsRequest, reader: jspb.BinaryReader): StatsRequest;
}

export namespace StatsRequest {
  export type AsObject = {
    username: string,
  }
}

export class StatsResponse extends jspb.Message {
  getJson(): string;
  setJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatsResponse): StatsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatsResponse;
  static deserializeBinaryFromReader(message: StatsResponse, reader: jspb.BinaryReader): StatsResponse;
}

export namespace StatsResponse {
  export type AsObject = {
    json: string,
  }
}

export class ProfileRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileRequest): ProfileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileRequest;
  static deserializeBinaryFromReader(message: ProfileRequest, reader: jspb.BinaryReader): ProfileRequest;
}

export namespace ProfileRequest {
  export type AsObject = {
    username: string,
  }
}

export class ProfileResponse extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): void;

  getLastName(): string;
  setLastName(value: string): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getAbout(): string;
  setAbout(value: string): void;

  getRatingsJson(): string;
  setRatingsJson(value: string): void;

  getStatsJson(): string;
  setStatsJson(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileResponse): ProfileResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileResponse;
  static deserializeBinaryFromReader(message: ProfileResponse, reader: jspb.BinaryReader): ProfileResponse;
}

export namespace ProfileResponse {
  export type AsObject = {
    firstName: string,
    lastName: string,
    countryCode: string,
    title: string,
    about: string,
    ratingsJson: string,
    statsJson: string,
    userId: string,
  }
}

export class UpdateProfileRequest extends jspb.Message {
  getAbout(): string;
  setAbout(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProfileRequest): UpdateProfileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProfileRequest;
  static deserializeBinaryFromReader(message: UpdateProfileRequest, reader: jspb.BinaryReader): UpdateProfileRequest;
}

export namespace UpdateProfileRequest {
  export type AsObject = {
    about: string,
  }
}

export class UpdateProfileResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProfileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProfileResponse): UpdateProfileResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProfileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProfileResponse;
  static deserializeBinaryFromReader(message: UpdateProfileResponse, reader: jspb.BinaryReader): UpdateProfileResponse;
}

export namespace UpdateProfileResponse {
  export type AsObject = {
  }
}

export class UsernameSearchRequest extends jspb.Message {
  getPrefix(): string;
  setPrefix(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsernameSearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UsernameSearchRequest): UsernameSearchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UsernameSearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsernameSearchRequest;
  static deserializeBinaryFromReader(message: UsernameSearchRequest, reader: jspb.BinaryReader): UsernameSearchRequest;
}

export namespace UsernameSearchRequest {
  export type AsObject = {
    prefix: string,
  }
}

export class UsernameSearchResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<BasicUser>;
  setUsersList(value: Array<BasicUser>): void;
  addUsers(value?: BasicUser, index?: number): BasicUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsernameSearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UsernameSearchResponse): UsernameSearchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UsernameSearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsernameSearchResponse;
  static deserializeBinaryFromReader(message: UsernameSearchResponse, reader: jspb.BinaryReader): UsernameSearchResponse;
}

export namespace UsernameSearchResponse {
  export type AsObject = {
    usersList: Array<BasicUser.AsObject>,
  }
}

export class AddFollowRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddFollowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddFollowRequest): AddFollowRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddFollowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddFollowRequest;
  static deserializeBinaryFromReader(message: AddFollowRequest, reader: jspb.BinaryReader): AddFollowRequest;
}

export namespace AddFollowRequest {
  export type AsObject = {
    uuid: string,
  }
}

export class RemoveFollowRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveFollowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveFollowRequest): RemoveFollowRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveFollowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveFollowRequest;
  static deserializeBinaryFromReader(message: RemoveFollowRequest, reader: jspb.BinaryReader): RemoveFollowRequest;
}

export namespace RemoveFollowRequest {
  export type AsObject = {
    uuid: string,
  }
}

export class GetFollowsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowsRequest): GetFollowsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFollowsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowsRequest;
  static deserializeBinaryFromReader(message: GetFollowsRequest, reader: jspb.BinaryReader): GetFollowsRequest;
}

export namespace GetFollowsRequest {
  export type AsObject = {
  }
}

export class AddBlockRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddBlockRequest): AddBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddBlockRequest;
  static deserializeBinaryFromReader(message: AddBlockRequest, reader: jspb.BinaryReader): AddBlockRequest;
}

export namespace AddBlockRequest {
  export type AsObject = {
    uuid: string,
  }
}

export class RemoveBlockRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveBlockRequest): RemoveBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveBlockRequest;
  static deserializeBinaryFromReader(message: RemoveBlockRequest, reader: jspb.BinaryReader): RemoveBlockRequest;
}

export namespace RemoveBlockRequest {
  export type AsObject = {
    uuid: string,
  }
}

export class GetBlocksRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksRequest): GetBlocksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksRequest;
  static deserializeBinaryFromReader(message: GetBlocksRequest, reader: jspb.BinaryReader): GetBlocksRequest;
}

export namespace GetBlocksRequest {
  export type AsObject = {
  }
}

export class GetFullBlocksRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFullBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFullBlocksRequest): GetFullBlocksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFullBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFullBlocksRequest;
  static deserializeBinaryFromReader(message: GetFullBlocksRequest, reader: jspb.BinaryReader): GetFullBlocksRequest;
}

export namespace GetFullBlocksRequest {
  export type AsObject = {
  }
}

export class OKResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OKResponse): OKResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OKResponse;
  static deserializeBinaryFromReader(message: OKResponse, reader: jspb.BinaryReader): OKResponse;
}

export namespace OKResponse {
  export type AsObject = {
  }
}

export class BasicUser extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BasicUser.AsObject;
  static toObject(includeInstance: boolean, msg: BasicUser): BasicUser.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BasicUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BasicUser;
  static deserializeBinaryFromReader(message: BasicUser, reader: jspb.BinaryReader): BasicUser;
}

export namespace BasicUser {
  export type AsObject = {
    uuid: string,
    username: string,
  }
}

export class GetActiveChatChannelsRequest extends jspb.Message {
  getNumber(): number;
  setNumber(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  getTournamentId(): string;
  setTournamentId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetActiveChatChannelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetActiveChatChannelsRequest): GetActiveChatChannelsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetActiveChatChannelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetActiveChatChannelsRequest;
  static deserializeBinaryFromReader(message: GetActiveChatChannelsRequest, reader: jspb.BinaryReader): GetActiveChatChannelsRequest;
}

export namespace GetActiveChatChannelsRequest {
  export type AsObject = {
    number: number,
    offset: number,
    tournamentId: string,
  }
}

export class ActiveChatChannels extends jspb.Message {
  clearChannelsList(): void;
  getChannelsList(): Array<ActiveChatChannels.Channel>;
  setChannelsList(value: Array<ActiveChatChannels.Channel>): void;
  addChannels(value?: ActiveChatChannels.Channel, index?: number): ActiveChatChannels.Channel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActiveChatChannels.AsObject;
  static toObject(includeInstance: boolean, msg: ActiveChatChannels): ActiveChatChannels.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ActiveChatChannels, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActiveChatChannels;
  static deserializeBinaryFromReader(message: ActiveChatChannels, reader: jspb.BinaryReader): ActiveChatChannels;
}

export namespace ActiveChatChannels {
  export type AsObject = {
    channelsList: Array<ActiveChatChannels.Channel.AsObject>,
  }

  export class Channel extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    getDisplayName(): string;
    setDisplayName(value: string): void;

    getLastUpdate(): number;
    setLastUpdate(value: number): void;

    getHasUpdate(): boolean;
    setHasUpdate(value: boolean): void;

    getLastMessage(): string;
    setLastMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Channel.AsObject;
    static toObject(includeInstance: boolean, msg: Channel): Channel.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Channel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Channel;
    static deserializeBinaryFromReader(message: Channel, reader: jspb.BinaryReader): Channel;
  }

  export namespace Channel {
    export type AsObject = {
      name: string,
      displayName: string,
      lastUpdate: number,
      hasUpdate: boolean,
      lastMessage: string,
    }
  }
}

export class GetChatsRequest extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetChatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetChatsRequest): GetChatsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetChatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetChatsRequest;
  static deserializeBinaryFromReader(message: GetChatsRequest, reader: jspb.BinaryReader): GetChatsRequest;
}

export namespace GetChatsRequest {
  export type AsObject = {
    channel: string,
  }
}

export class GetFollowsResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<BasicUser>;
  setUsersList(value: Array<BasicUser>): void;
  addUsers(value?: BasicUser, index?: number): BasicUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowsResponse): GetFollowsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFollowsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowsResponse;
  static deserializeBinaryFromReader(message: GetFollowsResponse, reader: jspb.BinaryReader): GetFollowsResponse;
}

export namespace GetFollowsResponse {
  export type AsObject = {
    usersList: Array<BasicUser.AsObject>,
  }
}

export class GetBlocksResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<BasicUser>;
  setUsersList(value: Array<BasicUser>): void;
  addUsers(value?: BasicUser, index?: number): BasicUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksResponse): GetBlocksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksResponse;
  static deserializeBinaryFromReader(message: GetBlocksResponse, reader: jspb.BinaryReader): GetBlocksResponse;
}

export namespace GetBlocksResponse {
  export type AsObject = {
    usersList: Array<BasicUser.AsObject>,
  }
}

export class GetFullBlocksResponse extends jspb.Message {
  clearUserIdsList(): void;
  getUserIdsList(): Array<string>;
  setUserIdsList(value: Array<string>): void;
  addUserIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFullBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFullBlocksResponse): GetFullBlocksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFullBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFullBlocksResponse;
  static deserializeBinaryFromReader(message: GetFullBlocksResponse, reader: jspb.BinaryReader): GetFullBlocksResponse;
}

export namespace GetFullBlocksResponse {
  export type AsObject = {
    userIdsList: Array<string>,
  }
}

