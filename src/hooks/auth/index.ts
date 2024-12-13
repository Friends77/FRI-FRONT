import { login } from "@/apis/auth";
import { AUTH_ERROR_MSG } from "@/constants/message";
import { ROOT_PATH } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

interface UseLoginParams {
  /** 로그인 중 발생한 에러처리를 위한 함수 */
  loginErrorHandler: (name: "email" | "password", message: string) => void;
}

export const useLogin = ({ loginErrorHandler }: UseLoginParams) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(ROOT_PATH.ROOT);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const { status } = err;

        if (status === 401) {
          loginErrorHandler("password", AUTH_ERROR_MSG.PASSWORD_INCORRECT);
        } else if (status === 404) {
          loginErrorHandler("email", AUTH_ERROR_MSG.EMAIL_NOT_EXIST);
        }
      }
    },
  });
};
