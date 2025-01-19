import AuthAxios from '@/apis/@core/authInstance';
import { IProfileResponse, UpdateProfileFormDataType } from '@/types/user';

export const getProfile = async () => {
  const response = await AuthAxios.get<IProfileResponse>('/api/user/profile');

  return response.data;
};

export const updateProfile = async (formData: UpdateProfileFormDataType) => {
  const response = await AuthAxios.put('/api/user/profile', formData);

  return response.data;
};
