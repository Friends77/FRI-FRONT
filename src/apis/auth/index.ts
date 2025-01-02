import Axios from '@/apis/@core/instance';
import AuthAxios from '@/apis/@core/authInstance';
import {
  ILoginResponse,
  IRefreshResponse,
  ISendVerifyCodeResponse,
  ISocialLoginResponse,
  LoginDataType,
  SocialLoginTokenType,
} from '@/types/auth';

export async function login({ email, password }: LoginDataType) {
  const response = await Axios.post<ILoginResponse>('/api/auth/login', {
    email,
    password,
  });

  return response.data;
}

export async function refresh() {
  const response = await AuthAxios.post<IRefreshResponse>('/api/auth/refresh');

  return response.data;
}

export async function sendVerifyEmail(email: string) {
  const response = await Axios.post('/api/auth/send-verification-code', {
    email,
  });

  return response.data;
}

export async function sendVerifyCode({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const response = await Axios.post<ISendVerifyCodeResponse>(
    '/api/auth/verify-email',
    {
      email,
      code,
    },
  );

  return response.data;
}

export async function sendSocialLoginToken({
  code,
  provider,
}: SocialLoginTokenType) {
  const response = await Axios.post<ISocialLoginResponse>('/api/auth/oauth2', {
    code,
    provider,
  });
  return response.data;
}

export async function resetPassword({
  emailAuthToken,
  newPassword,
}: {
  emailAuthToken: string;
  newPassword: string;
}) {
  const response = await AuthAxios.post('/api/auth/reset-password', {
    emailAuthToken,
    newPassword,
  });

  return response.data;
}
