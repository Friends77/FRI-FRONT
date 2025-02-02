import { getChatMember } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import chatMembersAtom from '@/recoil/chat/member';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface IUseGetMemberProfile {
  roomId: number;
  memberId: number | null;
  setNewMemberId: (memberId: number | null) => void;
}

const useGetMemberProfile = ({
  roomId,
  memberId,
  setNewMemberId,
}: IUseGetMemberProfile) => {
  const setChatMembers = useSetRecoilState(chatMembersAtom);

  const { data: enteredUserProfile } = useQuery({
    queryKey: CHAT_KEYS.CHAT_NEW_MEMBER_PROFILE(roomId, memberId!),
    queryFn: () => getChatMember({ roomId, memberId: memberId! }),
    enabled: !!roomId && !!memberId,
  });

  useEffect(() => {
    if (enteredUserProfile) {
      setChatMembers((prevList) => [...prevList, enteredUserProfile]);
      setNewMemberId(null);
    }
  }, [enteredUserProfile]);
};

export default useGetMemberProfile;
