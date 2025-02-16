import { sendFriendRequest } from '@/apis/user';
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
      alert('친구요청을 실패했습니다.');
    },
  });
};

export default useFriendRequest;
