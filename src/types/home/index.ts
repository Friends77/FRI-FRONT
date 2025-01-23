// 사용자 선택 태그 기반 추천 채팅방 리스트 타입
export interface IChatRoomByTagResponse {
  content: {
    id: number;
    title: string;
    imageUrl: string;
    categoryIdList: { id: number }[];
    participantCount: number;
    participantProfileList: string[];
  }[];
}
