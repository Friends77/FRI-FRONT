import { inviteChatRoom } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';

interface IUseSendChatInvite {
  onSuccessHandler: () => void;
}

const useSendChatInvite = ({ onSuccessHandler }: IUseSendChatInvite) => {
  return useMutation({
    mutationFn: inviteChatRoom,
    onSuccess: () => {
      onSuccessHandler();
    },
    onError: () => {
      alert('친구초대를 실패했습니다.');
    },
  });
};

export default useSendChatInvite;
