import AuthAxios from '@/apis/@core/authInstance';
import { IProfileResponse, IProfileSimpleResponse } from '@/types/user';

export const getProfile = async () => {
  const response = await AuthAxios.get<IProfileResponse>('/api/user/profile');

  return response.data;
};

export const getFriendList = async () => {
  const response = await AuthAxios.get<{ content: IProfileSimpleResponse[] }>(
    '/api/user/friendship',
  );

  return response.data;
};
