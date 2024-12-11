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
