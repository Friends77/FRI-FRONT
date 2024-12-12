import { login } from "@/apis/auth";
import { ROOT_PATH } from "@/constants/routes";
import isLoggedInAtom from "@/recoil/isLoggedIn/atom";
import { setCookie } from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";

export const useLogin = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken } = data;

      setCookie("accessToken", accessToken);
      setIsLoggedIn(true);
      navigate(ROOT_PATH.ROOT);
    },
    onError: () => {
      // 에러처리
    },
  });
};
