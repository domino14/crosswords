// @generated by protoc-gen-connect-query v2.0.1 with parameter "target=ts"
// @generated from file proto/user_service/user_service.proto (package user_service, syntax proto3)
/* eslint-disable */

import { SocializeService } from "./user_service_pb";

/**
 * @generated from rpc user_service.SocializeService.AddFollow
 */
export const addFollow = SocializeService.method.addFollow;

/**
 * @generated from rpc user_service.SocializeService.RemoveFollow
 */
export const removeFollow = SocializeService.method.removeFollow;

/**
 * @generated from rpc user_service.SocializeService.GetFollows
 */
export const getFollows = SocializeService.method.getFollows;

/**
 * @generated from rpc user_service.SocializeService.AddBlock
 */
export const addBlock = SocializeService.method.addBlock;

/**
 * @generated from rpc user_service.SocializeService.RemoveBlock
 */
export const removeBlock = SocializeService.method.removeBlock;

/**
 * @generated from rpc user_service.SocializeService.GetBlocks
 */
export const getBlocks = SocializeService.method.getBlocks;

/**
 * GetFullBlocks gets players who blocked us AND players we've blocked
 * together.
 *
 * @generated from rpc user_service.SocializeService.GetFullBlocks
 */
export const getFullBlocks = SocializeService.method.getFullBlocks;

/**
 * @generated from rpc user_service.SocializeService.GetActiveChatChannels
 */
export const getActiveChatChannels = SocializeService.method.getActiveChatChannels;

/**
 * @generated from rpc user_service.SocializeService.GetChatsForChannel
 */
export const getChatsForChannel = SocializeService.method.getChatsForChannel;

/**
 * @generated from rpc user_service.SocializeService.GetModList
 */
export const getModList = SocializeService.method.getModList;