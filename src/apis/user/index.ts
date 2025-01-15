import AuthAxios from '@/apis/@core/authInstance';
import { IProfileResponse } from '@/types/user';

export const getProfile = async () => {
  const response = await AuthAxios.get<IProfileResponse>('/api/user/profile');

  return response.data;
};
