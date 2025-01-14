import AuthAxios from '@/apis/@core/authInstance';
import { ChatListParamsType, IMyChatListResponse } from '@/types/chat';
import { createQueryParams } from '@/utils/formatter/queryParams';

export const getChatList = async ({
  size,
  lastChatRoomMemberId,
}: ChatListParamsType) => {
  const queryParams = createQueryParams({ size, lastChatRoomMemberId });
  const response = await AuthAxios.get<IMyChatListResponse>(
    `/api/user/chat/room${queryParams}`,
  );

  return response.data;
};
