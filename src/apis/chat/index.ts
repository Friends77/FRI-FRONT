import AuthAxios from '@/apis/@core/authInstance';
import {
  IChatMemberProfileItem,
  IChatRoomDetailResponse,
  ICreateChatRoomRequest,
  ICreateChatRoomResponse,
  IGetChatMemberRequest,
  IGetChatMessagesResponse,
  IGetChatMessagesType,
  IGetFriendsToInviteRequest,
  IInviteChatForm,
  IMemberToInviteResponse,
  IMyChatItem,
  ISecondaryTokenResponse,
} from '@/types/chat';
import { createQueryParams } from '@/utils/formatter/queryParams';

// 채팅방 생성
export const createChatRoom = async ({
  title,
  description,
  categoryIdList,
  backgroundImage,
}: ICreateChatRoomRequest) => {
  const formData = new FormData();

  const chatRoomData = {
    title,
    categoryIdList,
    description,
  };

  formData.append('chatRoomCreateRequestDto', JSON.stringify(chatRoomData));

  if (backgroundImage) {
    formData.append('backgroundImage', backgroundImage);
  }

  const response = await AuthAxios.post<ICreateChatRoomResponse>(
    '/api/user/chat/room',
    formData,
  );

  return response.data;
};

// 참여 중인 채팅방 목록 조회
export const getChatList = async () => {
  const response = await AuthAxios.get<IMyChatItem[]>('/api/user/chat/room');

  return response.data;
};

// 채팅방 입장
export const enterChatRoom = async (roomId: number) => {
  await AuthAxios.post(`/api/user/chat/room/${roomId}`);
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

// 채팅방 초대
export const inviteChatRoom = async ({ roomId, friendId }: IInviteChatForm) => {
  const inviteChatForm = {
    chatRoomId: roomId,
    receiverIdList: [friendId],
  };

  await AuthAxios.post('/api/user/chat/invitation/request', inviteChatForm);

  return { data: { friendId } };
};

// 초대 가능한 친구 리스트
export const getFriendsToInvite = async ({
  roomId,
  nickname,
}: IGetFriendsToInviteRequest) => {
  const response = await AuthAxios.get<IMemberToInviteResponse>(
    `/api/user/friendship/chatRoom/${roomId}/invite-list`,
    {
      params: { nickname },
    },
  );

  return response.data;
};
