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
