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
