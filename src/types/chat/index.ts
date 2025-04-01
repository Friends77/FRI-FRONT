import {
  IInterestTag,
  IPaginationParams,
  IPaginationResponse,
  Options,
} from '../@common';
import { ISimpleUserProfile } from '../user';

export interface ICreateChatRoomRequest {
  title: string;
  description?: string;
  categoryIdList: number[];
  backgroundImage?: Blob;
}

export interface ICreateChatRoomForm {
  title: string;
  description?: string;
  categoryIdList: Options[];
  backgroundImage?: Blob;
}

export interface ICreateChatRoomResponse {
  chatRoomId: number;
}

export interface ISecondaryTokenResponse {
  secondaryToken: string;
}

export interface IMyChatItem {
  chatRoomMemberId: number;
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: number[];
  participantCount: number;
  participantProfileList: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  SYSTEM = 'SYSTEM',
  SYSTEM_MEMBER_ENTER = 'SYSTEM_MEMBER_ENTER',
  SYSTEM_MEMBER_LEAVE = 'SYSTEM_MEMBER_LEAVE',
  SYSTEM_NEW_MANAGER = 'SYSTEM_NEW_MANAGER',
  SYSTEM_READ = 'SYSTEM_READ',
}

export type MyMessageType = Extract<
  MessageType,
  MessageType.TEXT | MessageType.IMAGE
>;

export interface IPendingMessageItem {
  clientMessageId: string;
  chatRoomId: number;
  type: MessageType;
  content: string;
  senderId: number;
}

export interface ISentMessageItem {
  code: number;
  clientMessageId?: string;
  chatRoomId: number;
  messageId: number;
  type: MessageType;
  senderId?: number;
  content: string;
  createdAt: number;
}

export interface IChatRoomInfo {
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: number[];
  participantCount: number;
  likeCount: number;
  isLike: boolean;
}

export interface IGetChatMessagesType extends IPaginationParams {
  roomId: number;
  lastMessageId?: number;
}

export interface IGetChatMessagesResponse extends IPaginationResponse {
  content: ISentMessageItem[];
}

export interface ISendMessageHandler {
  (data: { [key: string]: string | number }): void;
}

export interface IChatRoomDetailResponse {
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: IInterestTag[];
  participantCount: number;
  likeCount: number;
  isLike: boolean;
  lastMessageId: number;
  lastReadMessageId: number;
}

export interface ISendMyMessageForm {
  messageType: MyMessageType;
  imagePath?: string;
}

export interface IMessageUtil {
  currentMessage: ISentMessageItem;
  index: number;
}

export interface IPrevMessageUtil extends IMessageUtil {
  prevMessage: ISentMessageItem;
}

export interface INextMessageUtil extends IMessageUtil {
  nextMessage: ISentMessageItem;
  length: number;
}

export enum FriendsStatus {
  AVAILABLE = 'AVAILABLE',
  RECEIVED = 'RECEIVED',
  REQUESTED = 'REQUESTED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface IChatMemberProfileItem {
  id: number;
  nickname: string;
  profileImageUrl: string;
  friendshipStatusEnums: FriendsStatus;
  isManager: boolean;
  isMe: boolean;
}

export interface IGetChatMemberRequest {
  roomId: number;
  memberId: number;
}

export interface ISelectedImageMessageViewer {
  selectedImageIndex: number;
  message: ISentMessageItem | IPendingMessageItem | null;
}

export interface IInviteChatForm {
  roomId: number;
  friendId: number;
}

export interface IMemberToInviteResponse {
  content: ISimpleUserProfile[];
}

export interface IGetFriendsToInviteRequest {
  roomId: number;
  nickname?: string;
}

export enum FriendsInvitationStatus {
  AVAILABLE = 'AVAILABLE',
  INVITED = 'INVITED',
}

export interface IMemberWithStatus extends ISimpleUserProfile {
  status: FriendsInvitationStatus;
}
