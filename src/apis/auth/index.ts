import Axios from "@/apis/@core";
import { LoginDataType } from "@/types/auth";

export async function login({ email, password }: LoginDataType) {
  const response = await Axios.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}
