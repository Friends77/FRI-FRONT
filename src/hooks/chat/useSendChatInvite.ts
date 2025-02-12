import { inviteChatRoom } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';

interface IUseSendChatInvite {
  onSuccessHandler: ({ friendId }: { friendId: number }) => void;
}

const useSendChatInvite = ({ onSuccessHandler }: IUseSendChatInvite) => {
  return useMutation({
    mutationFn: inviteChatRoom,
    onSuccess: ({ data }) => {
      onSuccessHandler(data);
    },
    onError: () => {
      alert('친구초대를 실패했습니다.');
    },
  });
};

export default useSendChatInvite;
