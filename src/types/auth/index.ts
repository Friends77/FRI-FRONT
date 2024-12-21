export type LoginDataType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  email: string;
  certno: string;
  password: string;
  "confirm-password": string;
};

export type EmailVerificationDataType = Pick<
  SignUpDataType,
  "email" | "certno"
>;

export type ResetPasswordDataType = Pick<
  SignUpDataType,
  "password" | "confirm-password"
>;
