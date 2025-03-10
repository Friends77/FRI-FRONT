import AuthAxios from '@/apis/@core/authInstance';
import { IUserProfile } from '@/types/@common';
import {
  UpdateProfileFormDataType,
  IProfileSimpleResponse,
  IGetAlarmListResponse,
  IGetAlarmListRequest,
} from '@/types/user';

// 내 프로필 조회
export const getProfile = async () => {
  const response = await AuthAxios.get<IUserProfile>('/api/user/profile');

  return response.data;
};

// 내 프로필 수정
export const updateProfile = async (formData: UpdateProfileFormDataType) => {
  const response = await AuthAxios.put('/api/user/profile', formData);

  return response.data;
};

// 친구 목록 조회
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

// 안읽은 알림 개수 조회
export const getUnreadAlarmCount = async () => {
  const response = await AuthAxios.get<number>('/api/user/alarm/unread-count');

  return response.data;
};

// 알림 조회
export const getAlarmList = async ({
  size,
  lastAlarmId,
}: IGetAlarmListRequest) => {
  const response = await AuthAxios.get<IGetAlarmListResponse>(
    '/api/user/alarm',
    {
      params: {
        size,
        lastAlarmId,
      },
    },
  );

  return response.data;
};

// 친구 요청 수락
export const acceptFriendRequest = async (alarmId: number) => {
  const requestForm = {
    alarmId,
  };

  const response = await AuthAxios.post(
    '/api/user/friendship/accept',
    requestForm,
  );

  return response.data;
};

// 친구 요청 거절
export const rejectFriendRequest = async (alarmId: number) => {
  const requestForm = {
    alarmId,
  };

  const response = await AuthAxios.post(
    '/api/user/friendship/reject',
    requestForm,
  );

  return response.data;
};
