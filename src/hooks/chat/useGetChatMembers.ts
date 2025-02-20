import { getChatMemberList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import chatMembersAtom from '@/recoil/chat/member';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface IUseGetChatMembers {
  roomId: number;
}

const useGetChatMembers = ({ roomId }: IUseGetChatMembers) => {
  const setChatMembers = useSetRecoilState(chatMembersAtom);

  const { data: chatMembers } = useQuery({
    queryKey: CHAT_KEYS.CHAT_MEMBER_LIST(roomId),
    queryFn: () => getChatMemberList(roomId),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (chatMembers) {
      setChatMembers(chatMembers);
    }
  }, [chatMembers]);
};

export default useGetChatMembers;
