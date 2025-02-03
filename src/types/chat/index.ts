import {
  IInterestCategoryItem,
  IPaginationParams,
  IPaginationResponse,
} from '../@common';

export interface ICreateChatRoomRequest {
  title: string;
  categoryIdList: number[];
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

export type MessageType =
  | 'TEXT'
  | 'IMAGE'
  | 'SYSTEM'
  | 'SYSTEM_MEMBER_ENTER'
  | 'SYSTEM_MEMBER_LEAVE'
  | 'SYSTEM_NEW_MANAGER';

export type MyMessageType = 'TEXT' | 'IMAGE';

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
  categoryIdList: IInterestCategoryItem[];
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

export interface IChatMemberProfileItem {
  id: number;
  nickname: string;
  profileImageUrl: string;
  friendshipStatusEnums: string;
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
