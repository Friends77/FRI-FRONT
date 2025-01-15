import { IPaginationParams, IPaginationResponse } from '../@common';

export interface ICreateChatRoomRequest {
  title: string;
  // TODO: 카테고리 타입 import
  categoryIdList: any;
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
  // TODO: 카테고리 타입 import
  categoryIdList: any;
  participantCount: number;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface IMyChatListResponse extends IPaginationResponse {
  content: IMyChatItem[];
}

export interface IPendingMessageItem {
  clientMessageId: string;
  chatRoomId: number;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  content: string;
  senderId: number;
}

export interface ISentMessageItem {
  code: number;
  clientMessageId?: string;
  chatRoomId: number;
  messageId: number;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  senderId: number;
  content: string;
  createdAt: string;
  status: 'pending' | 'sent';
}

export interface IChatRoomInfo {
  id: number;
  title: string;
  imageUrl: string;
  // TODO: 카테고리 타입 import
  categoryIdList: any;
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
