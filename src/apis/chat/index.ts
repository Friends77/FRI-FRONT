import AuthAxios from '@/apis/@core/authInstance';
import {
  ICreateChatRoomRequest,
  ICreateChatRoomResponse,
  IGetChatMessagesResponse,
  IGetChatMessagesType,
  IMyChatItem,
  ISecondaryTokenResponse,
} from '@/types/chat';
import { createQueryParams } from '@/utils/formatter/queryParams';

export const createChatRoom = async ({
  title,
  categoryIdList,
}: ICreateChatRoomRequest) => {
  // TODO: UI 완성되면 수정 필요
  const formData = new FormData();

  const chatRoomData = {
    title,
    // categoryIdList,
    categoryIdList: [1],
  };

  formData.append('chatRoomCreateRequestDto', JSON.stringify(chatRoomData));

  const response = await AuthAxios.post<ICreateChatRoomResponse>(
    '/api/user/chat/room',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const getChatList = async (nickname?: string) => {
  const queryParams = createQueryParams({ nickname });
  const response = await AuthAxios.get<IMyChatItem[]>(
    `/api/user/chat/room${queryParams}`,
  );

  return response.data;
};

export const enterChatRoom = async (roomId: number) => {
  const response = await AuthAxios.post(`/api/user/chat/room/${roomId}`);

  return response.data;
};

export const getSecondaryToken = async () => {
  const response = await AuthAxios.get<ISecondaryTokenResponse>(
    '/api/user/secondaryToken',
  );

  return response.data;
};

export const getChatMessages = async ({
  roomId,
  size,
  lastMessageId,
}: IGetChatMessagesType) => {
  const response = await AuthAxios.get<IGetChatMessagesResponse>(
    `/api/user/message/previous/${roomId}`,
    {
      params: {
        size,
        lastMessageId,
      },
    },
  );

  return response.data;
};
