import Axios from '@/apis/@core/instance';
import { IChatRoomByTagResponse } from '@/types/home';

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
