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
