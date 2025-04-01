import AuthAxios from '@/apis/@core/authInstance';
import Axios from '@/apis/@core/instance';
import {
  CheckAvailabilityResponse,
  checkAvailabilityType,
  ILoginResponse,
  IRefreshResponse,
  ISendVerifyCodeResponse,
  ISocialLoginResponse,
  LoginDataType,
  ResetPasswordType,
  SocialLoginTokenType,
  VerifyCodeType,
} from '@/types/auth';

// 로그인
export async function login({ email, password }: LoginDataType) {
  const response = await Axios.post<ILoginResponse>('/api/auth/login', {
    email,
    password,
  });

  return response.data;
}

// 로그아웃
export async function logout(accessToken: string) {
  const response = await AuthAxios.post('/api/auth/logout', {
    accessToken,
  });

  return response.data;
}

// 토큰 갱신
export async function refresh() {
  const response = await Axios.post<IRefreshResponse>('/api/auth/refresh');

  return response.data;
}

// 이메일 인증코드 전송
export async function sendVerifyEmail(email: string) {
  const response = await Axios.post('/api/auth/send-verification-code', {
    email,
  });

  return response.data;
}

// 이메일 인증코드 확인
export async function sendVerifyCode({ email, code }: VerifyCodeType) {
  const response = await Axios.post<ISendVerifyCodeResponse>(
    '/api/auth/verify-email',
    {
      email,
      code,
    },
  );

  return response.data;
}

// 소셜 로그인
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

// 비밀번호 재설정
export async function resetPassword({
  emailAuthToken,
  newPassword,
}: ResetPasswordType) {
  const response = await AuthAxios.post('/api/auth/reset-password', {
    emailAuthToken,
    newPassword,
  });

  return response.data;
}

// 닉네임, 이메일 중복체크
export const checkAvailability = async ({
  type,
  value,
}: checkAvailabilityType) => {
  const response = await Axios.get<CheckAvailabilityResponse>(
    `/api/auth/check-${type}?${type}=${value}`,
  );

  return response.data;
};

// 회원가입
export const signUp = async (formData: FormData) => {
  const response = await Axios.post('/api/auth/register', formData);

  return response.data;
};
