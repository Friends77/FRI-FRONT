import AuthAxios from '@/apis/@core/authInstance';
import Axios from '@/apis/@core/instance';
import { IUserProfile } from '@/types/@common';
import { ISimpleUserProfile } from '@/types/user';
import { IPrivateRecommendUsers } from './../../types/@common/index';
import { CategoryResponse } from '@/types/auth';

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

// 카테고리 조회
export const getCategory = async () => {
  const response = await Axios.get<CategoryResponse>('/api/global/category');

  return response.data;
};

// 친구 찾아보기 - 비로그인
export const getPublicUserRecommendations = async (size: number) => {
  const response = await Axios.get<{ content: ISimpleUserProfile[] }>(
    `/api/global/recommendation/user`,
    {
      params: {
        size,
      },
    },
  );

  return response.data;
};

// 친구 찾아보기 - 로그인
export const getPrivateUserRecommendations = async (size: number) => {
  const response = await AuthAxios.get<IPrivateRecommendUsers>(
    `/api/user/recommendation/user`,
    {
      params: {
        size,
      },
    },
  );

  return response.data;
};
