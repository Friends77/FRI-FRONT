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

export interface IChatMessageItem {
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  status: 'loading' | 'success';
  message: string;
  senderId: number;
  senderName: string;
  sendTime: string;
}

// TODO: 위 IChatMessageItem와 통일 후 삭제 예정
export interface IChatMessageServerItem {
  messageId: number;
  senderId: number;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  createdAt: string;
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
  roomId: string;
  lastMessageId?: number;
}

export interface IGetChatMessagesResponse extends IPaginationResponse {
  content: IChatMessageServerItem[];
}
