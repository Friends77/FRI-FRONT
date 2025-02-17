import AuthAxios from '@/apis/@core/authInstance';
import { IUserProfile } from '@/types/@common';
import {
  UpdateProfileFormDataType,
  IProfileSimpleResponse,
} from '@/types/user';

export const getProfile = async () => {
  const response = await AuthAxios.get<IUserProfile>('/api/user/profile');

  return response.data;
};

export const updateProfile = async (formData: UpdateProfileFormDataType) => {
  const response = await AuthAxios.put('/api/user/profile', formData);

  return response.data;
};

export const getFriendList = async () => {
  const response = await AuthAxios.get<{ content: IProfileSimpleResponse[] }>(
    '/api/user/friendship',
  );

  return response.data;
};

// 다른 유저 프로필 조회
export const getUserProfile = async (memberId: number) => {
  const response = await AuthAxios.get<IUserProfile>(
    `/api/global/profile/${memberId}`,
  );

  return response.data;
};

// 친구 요청
export const sendFriendRequest = async (friendId: number) => {
  const requestFriendForm = {
    receiverId: friendId,
  };

  await AuthAxios.post('/api/user/friendship/request', requestFriendForm);
};
