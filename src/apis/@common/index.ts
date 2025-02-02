import AuthAxios from '@/apis/@core/authInstance';

// 이미지 업로드
export const imageUpload = async (formData: FormData) => {
  const response = await AuthAxios.post<string>('/api/user/image', formData);

  return response.data;
};
