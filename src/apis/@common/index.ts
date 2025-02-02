import AuthAxios from '@/apis/@core/authInstance';

export const imageUpload = async (formData: FormData) => {
  const response = await AuthAxios.post<string>('/api/user/image', formData);

  return response.data;
};
