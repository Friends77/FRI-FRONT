import Axios from '@/apis/@core/instance';
import { IChatRoomByTagResponse, IFriendsByTagResponse } from '@/types/home';

// 사용자 선택 태그 기반 추천 채팅방
export const getChatRoomsByTag = async (id: number) => {
  const response = await Axios.get<IChatRoomByTagResponse>(
    '/api/global/recommendation/chat/category',
    {
      params: {
        categoryIds: id,
      },
    },
  );

  return response.data;
};

// 사용자 선택 태그 기반 추천 유저
export const getFriendsByTag = async (id: number) => {
  const response = await Axios.get<IFriendsByTagResponse>(
    '/api/global/recommendation/user/category',
    {
      params: {
        categoryIds: id,
        size: 8,
      },
    },
  );

  return response.data;
};
