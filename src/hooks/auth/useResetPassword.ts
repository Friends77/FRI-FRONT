import { resetPassword } from '@/apis/auth';
import { ALERT_MESSAGE } from '@/constants/message';
import { AUTH_PATH } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert(ALERT_MESSAGE.PASSWORD_CHANGED);
      navigate(AUTH_PATH.LOGIN);
    },
  });
};
