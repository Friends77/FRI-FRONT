import { sendVerifyCode } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

interface UseVerifyCodeParams {
  onSuccessHandler: () => void;
  onErrorHandler: () => void;
}

export const useVerifyCode = ({
  onSuccessHandler,
  onErrorHandler,
}: UseVerifyCodeParams) => {
  return useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });
};
