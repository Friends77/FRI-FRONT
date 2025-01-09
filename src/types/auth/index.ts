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

export interface SignUpDataType {
  authToken: string;
  email: string;
  password: string;
  nickname: string;
  birth: number;
  gender: 'MAN' | 'WOMAN';
  selfDescription: string;
  mbti: string;
  interestTag: number[];
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface SignUpFormDataType extends SignUpDataType {
  certno: string;
  'confirm-password': string;
  EI: string;
  NS: string;
  FT: string;
  JP: string;
}

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
  SignUpFormDataType,
  'email' | 'certno'
>;

export type ResetPasswordDataType = Pick<
  SignUpFormDataType,
  'password' | 'confirm-password'
>;

export type CheckAvailabilityResponse = {
  isValid: boolean;
  message: string;
};

export type CategoryRespose = {
  id: number;
  name: string;
  type: 'SUBJECT' | 'REGION';
  image: string | null;
}[];

export type AvailabilityType = 'email' | 'nickname';
