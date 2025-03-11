import { inviteChatRoom } from '@/apis/chat';
import { ALERT_MESSAGE } from '@/constants/message';
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
      alert(ALERT_MESSAGE.FRIEND_INVITE_FAILED);
    },
  });
};

export default useSendChatInvite;
