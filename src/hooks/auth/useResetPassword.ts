import { resetPassword } from "@/apis/auth";
import { AUTH_PATH } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다!");
      navigate(AUTH_PATH.LOGIN);
    },
  });
};
