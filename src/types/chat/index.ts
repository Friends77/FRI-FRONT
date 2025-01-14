import { IPaginationResponse } from '../@common';

export interface IMyChatItem {
  chatRoomMemberId: number;
  id: number;
  title: string;
  imageUrl: string;
  // TODO: 카테고리 타입 import
  categoryIdList: any;
  participantCount: number;
  participantProfileList: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface IMyChatListResponse extends IPaginationResponse {
  content: IMyChatItem[];
}

export type ChatListParamsType = {
  size: number;
  lastChatRoomMemberId: number | null;
};
