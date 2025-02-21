// 사용자 선택 태그 기반 추천 채팅방 리스트 타입
export interface IChatRoomByTagResponse {
  content: {
    id: number;
    title: string;
    imageUrl: string;
    categoryIdList: {
      id: number;
      name: string;
      type: 'SUBJECT' | 'REGION';
      image: string;
    }[];
    participantCount: number;
    participantProfileList: string[];
    description: string;
  }[];
}

// 사용자 선택 태그 기반 추천 유저 리스트 타입
export interface IFriendsByTagResponse {
  content: {
    id: number;
    nickname: string;
    imageUrl: string;
    categoryIds: number[];
  }[];
}
