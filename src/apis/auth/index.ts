import Axios from "@/apis/@core/instance";
import AuthAxios from "@/apis/@core/authInstance";
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

export async function refresh() {
  const response = await AuthAxios.post("/api/auth/refresh");

  return response.data;
}
