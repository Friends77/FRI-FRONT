import Axios from "@/apis/@core";
import { LoginDataType, LoginResponse } from "@/types/auth";

export async function login({
  email,
  password,
}: LoginDataType): Promise<LoginResponse> {
  const response = await Axios.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function sendVerifyEmail(email: string) {
  const response = await Axios.post("/api/auth/send-verification-code", {
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
  const response = await Axios.post("/api/auth/verify-email", {
    email,
    code,
  });

  return response.data;
}
