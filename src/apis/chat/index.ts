import AuthAxios from '@/apis/@core/authInstance';
import { IMyChatItem } from '@/types/chat';
import { createQueryParams } from '@/utils/formatter/queryParams';

export const getChatList = async (nickname?: string) => {
  const queryParams = createQueryParams({ nickname });
  const response = await AuthAxios.get<IMyChatItem[]>(
    `/api/user/chat/room${queryParams}`,
  );

  return response.data;
};
