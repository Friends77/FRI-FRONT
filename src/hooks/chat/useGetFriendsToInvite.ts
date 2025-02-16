import { useQuery } from '@tanstack/react-query';
import { getFriendsToInvite } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';

interface IUseMessageListProps {
  roomId: number;
  nickname?: string;
}

const useGetFriendsToInvite = ({ roomId, nickname }: IUseMessageListProps) => {
  return useQuery({
    queryKey: CHAT_KEYS.CHAT_MEMBER_LIST_TO_INVITE(roomId, nickname),
    queryFn: () =>
      getFriendsToInvite({
        roomId,
        nickname,
      }),
  });
};

export default useGetFriendsToInvite;
