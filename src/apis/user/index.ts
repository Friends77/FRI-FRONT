import AuthAxios from '@/apis/@core/authInstance';
import { IUserProfile } from '@/types/@common';
import { IProfileSimpleResponse } from '@/types/user';

export const getProfile = async () => {
  const response = await AuthAxios.get<IUserProfile>('/api/user/profile');

  return response.data;
};

export const getFriendList = async () => {
  const response = await AuthAxios.get<{ content: IProfileSimpleResponse[] }>(
    '/api/user/friendship',
  );

  return response.data;
};
