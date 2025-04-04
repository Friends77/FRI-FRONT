import { CategoryType, Gender, ILocation } from '../@common';

export type LoginDataType = {
  email: string;
  password: string;
};

export type VerifyCodeType = {
  email: string;
  code: string;
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
  birth: string;
  gender: Gender;
  selfDescription: string;
  mbti: string;
  interestTag: number[];
  imageUrl: string;
  location: ILocation;
}

export interface SignUpFormDataType extends SignUpDataType {
  year: string;
  month: string;
  day: string;
  certno: string;
  'confirm-password': string;
  EI: string;
  NS: string;
  FT: string;
  JP: string;
}

export enum SocialType {
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
}

export type SocialLoginTokenType = {
  code: string;
  provider: SocialType;
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

export type CategoryResponse = {
  id: number;
  name: string;
  type: CategoryType;
  image: string | null;
}[];

export enum AvailabilityType {
  email = 'email',
  nickname = 'nickname',
}

export type ResetPasswordType = {
  emailAuthToken: string;
  newPassword: string;
};

export type checkAvailabilityType = {
  type: AvailabilityType;
  value: string;
};
