import { sendVerifyEmail } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

interface UseSendCodeToEmailParams {
  onSuccessHandler: () => void;
  onErrorHandler: () => void;
}

export const useSendCodeToEmail = ({
  onSuccessHandler,
  onErrorHandler,
}: UseSendCodeToEmailParams) => {
  return useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      alert("메일을 보냈어요! 메일함을 확인해주세요.");
      onSuccessHandler();
    },
    onError: () => {
      alert("이메일 발송에 실패했어요.");
      onErrorHandler();
    },
  });
};
