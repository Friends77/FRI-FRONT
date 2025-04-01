import { signUp } from '@/apis/auth';
import { ALERT_MESSAGE } from '@/constants/message';
import { AUTH_PATH } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert(ALERT_MESSAGE.SIGNUP_SUCCESS);
      navigate(AUTH_PATH.LOGIN);
    },
    onError: () => {
      alert(ALERT_MESSAGE.SIGNUP_FAILED);
    },
  });
};

export default useSignUp;
