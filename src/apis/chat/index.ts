import AuthAxios from '@/apis/@core/authInstance';
import {
  IChatMemberProfileItem,
  IChatRoomDetailResponse,
  ICreateChatRoomRequest,
  ICreateChatRoomResponse,
  IGetChatMemberRequest,
  IGetChatMessagesResponse,
  IGetChatMessagesType,
  IMyChatListResponse,
  ISecondaryTokenResponse,
} from '@/types/chat';

// 채팅방 생성
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

// 참여 중인 채팅방 목록 조회
export const getChatList = async () => {
  const response = await AuthAxios.get<IMyChatListResponse>(
    '/api/user/chat/room',
  );

  return response.data;
};

// 채팅방 입장
export const enterChatRoom = async (roomId: number) => {
  const response = await AuthAxios.post(`/api/user/chat/room/${roomId}`);

  return response.data;
};

// 채팅 웹소켓 연결을 위한 secondary token 발급
export const getSecondaryToken = async () => {
  const response = await AuthAxios.get<ISecondaryTokenResponse>(
    '/api/user/secondaryToken',
  );

  return response.data;
};

// 이전 메세지 조회
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

// 채팅방 상세정보 조회
export const getChatRoomDetail = async (roomId: number) => {
  const response = await AuthAxios.get<IChatRoomDetailResponse>(
    `/api/user/chat/room/${roomId}`,
  );

  return response.data;
};

// 채팅방 참여자 목록 조회
export const getChatMemberList = async (roomId: number) => {
  const response = await AuthAxios.get<IChatMemberProfileItem[]>(
    `/api/user/chat/room/${roomId}/member`,
  );

  return response.data;
};

// 채팅방 사용자 프로필 조회
export const getChatMember = async ({
  roomId,
  memberId,
}: IGetChatMemberRequest) => {
  const response = await AuthAxios.get<IChatMemberProfileItem>(
    `/api/user/chat/room/${roomId}/member/${memberId}`,
  );

  return response.data;
};

// 채팅방 나가기
export const exitChatRoom = async (roomId: number) => {
  await AuthAxios.delete(`/api/user/chat/room/${roomId}`);
};
