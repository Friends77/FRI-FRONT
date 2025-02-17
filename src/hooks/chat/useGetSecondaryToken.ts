import { getSecondaryToken } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetSecondaryToken = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: CHAT_KEYS.SECONDARY_TOKEN,
    queryFn: getSecondaryToken,
    enabled: !!isLoggedIn,
  });
};
