import { getSecondaryToken } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

interface IUseGetSecondaryToken {
  isLoggedIn: boolean;
  type: 'chat' | 'alarm';
}

export const useGetSecondaryToken = ({
  type,
  isLoggedIn,
}: IUseGetSecondaryToken) => {
  return useQuery({
    queryKey: CHAT_KEYS.SECONDARY_TOKEN(type),
    queryFn: getSecondaryToken,
    enabled: !!isLoggedIn,
  });
};
