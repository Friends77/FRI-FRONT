export type LoginDataType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  memberId: number;
  accessToken: string;
};

export type SignUpDataType = {
  email: string;
  certno: string;
  password: string;
  "confirm-password": string;
};

export type SocialLoginTokenType = {
  code: string;
  provider: "GOOGLE" | "NAVER";
};

export interface ISocialLoginResponse {
  nickname?: string;
  email?: string;
  imageUrl?: string;
  authToken?: string;
  isRegistered: boolean;
  accessToken?: string;
  memberId?: string;
}

export interface ISocialAuthInfo {
  isRegistered: boolean;
  authToken: string;
  nickname: string;
  email: string;
  imageUrl: string;
}
