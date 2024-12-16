import Axios from "@/apis/@core/instance";
import { LoginDataType, LoginResponse } from "@/types/auth";
import { getCookie } from "@/utils/cookie";

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
  const response = await Axios.post("/api/auth/refresh");

  return response.data;
}
