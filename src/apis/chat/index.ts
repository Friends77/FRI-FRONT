import AuthAxios from '@/apis/@core/authInstance';
import { IMyChatListResponse } from '@/types/chat';

export const getChatList = async () => {
  const response = await AuthAxios.get<IMyChatListResponse>(
    '/api/user/chat/room',
  );

  return response.data;
};
