import { login } from "@/apis/auth";
import { ROOT_PATH } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

interface UseLoginParams {
  /** 로그인 중 발생한 에러처리를 위한 함수 */
  loginErrorHandler: () => void;
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

        if (status === 401 || status === 404) {
          loginErrorHandler();
        }
      }
    },
  });
};
