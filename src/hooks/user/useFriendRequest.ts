import { sendFriendRequest } from '@/apis/user';
import { ALERT_MESSAGE } from '@/constants/message';
import { useMutation } from '@tanstack/react-query';

interface IUseFriendRequest {
  onSuccessHandler: () => void;
}

const useFriendRequest = ({ onSuccessHandler }: IUseFriendRequest) => {
  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      onSuccessHandler();
    },
    onError: () => {
      alert(ALERT_MESSAGE.FRIEND_REQUEST_FAILED);
    },
  });
};

export default useFriendRequest;
