import { IPaginationParams, IPaginationResponse } from '../@common';

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
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface IMyChatListResponse extends IPaginationResponse {
  content: IMyChatItem[];
}

export type MessageType = 'TEXT' | 'IMAGE' | 'SYSTEM';

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
  senderId: number;
  content: string;
  createdAt: string;
  status: 'pending' | 'sent';
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
