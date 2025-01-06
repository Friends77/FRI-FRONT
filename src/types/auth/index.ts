export type LoginDataType = {
  email: string;
  password: string;
};

export interface ILoginResponse {
  memberId: number;
  accessToken: string;
  refreshTokenExpiration: string;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshTokenExpiration: string;
}

export interface ISendVerifyCodeResponse {
  emailAuthToken: string;
}

export type SignUpDataType = {
  email: string;
  certno: string;
  password: string;
  'confirm-password': string;
  nickname: string;
  birth: number;
  gender: string;
  EI: string;
  NS: string;
  FT: string;
  JP: string;
};

export type SocialLoginTokenType = {
  code: string;
  provider: 'GOOGLE' | 'NAVER';
};

export interface ISocialLoginResponse {
  nickname?: string;
  email?: string;
  imageUrl?: string;
  authToken?: string;
  isRegistered: boolean;
  accessToken?: string;
  memberId?: string;
  refreshTokenExpiration?: string;
}

export interface ISocialAuthInfo {
  authToken: string;
  nickname: string;
  email: string;
  imageUrl: string;
}

export type EmailVerificationDataType = Pick<
  SignUpDataType,
  'email' | 'certno'
>;

export type ResetPasswordDataType = Pick<
  SignUpDataType,
  'password' | 'confirm-password'
>;

export type NicknameCheckResponse = {
  isValid: true;
  message: 'string';
};
