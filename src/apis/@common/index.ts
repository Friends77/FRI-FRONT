import AuthAxios from '@/apis/@core/authInstance';
import { IUserProfile } from '@/types/@common';

// 이미지 업로드
export const imageUpload = async (formData: FormData) => {
  const response = await AuthAxios.post<string>('/api/user/image', formData);

  return response.data;
};

// 유저 프로필 조회
export const getUserProfile = async (memberId: number) => {
  const response = await AuthAxios.get<IUserProfile>(
    `/api/global/profile/${memberId}`,
  );

  return response.data;
};
