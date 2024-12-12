export type LoginDataType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  memberId: number;
  accessToken: string;
};
