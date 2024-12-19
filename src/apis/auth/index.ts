import Axios from "@/apis/@core/instance";
import AuthAxios from "@/apis/@core/authInstance";
import { LoginDataType } from "@/types/auth";

export async function login({ email, password }: LoginDataType) {
  const response = await Axios.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function refresh() {
  const response = await AuthAxios.post("/api/auth/refresh");

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
