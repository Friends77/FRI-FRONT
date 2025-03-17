import { sendVerifyEmail } from '@/apis/auth';
import { ALERT_MESSAGE } from '@/constants/message';
import { useMutation } from '@tanstack/react-query';

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
      alert(ALERT_MESSAGE.EMAIL_SENT);
      onSuccessHandler();
    },
    onError: () => {
      alert(ALERT_MESSAGE.EMAIL_SEND_FAILED);
      onErrorHandler();
    },
  });
};
