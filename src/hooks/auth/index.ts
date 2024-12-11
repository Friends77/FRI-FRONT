import { login } from "@/apis/auth";
import { ROOT_PATH } from "@/constants/routes";
import { setCookie } from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken } = data;

      setCookie("accessToken", accessToken);
      navigate(ROOT_PATH.ROOT);
    },
    onError: () => {
      // 에러처리
    },
  });
};
