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
