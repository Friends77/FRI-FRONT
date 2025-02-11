import AuthAxios from '@/apis/@core/authInstance';
import Axios from '@/apis/@core/instance';
import { IUserProfile } from '@/types/@common';
import { IProfileSimpleResponse } from '@/types/user';

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

// 유저 추천
export const getUserRecommendations = async (size: number) => {
  const response = await Axios.get<{ content: IProfileSimpleResponse[] }>(
    `/api/global/recommendation/user`,
    {
      params: {
        size,
      },
    },
  );

  return response.data;
};
