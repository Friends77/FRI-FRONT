import { getSecondaryToken } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetSecondaryToken = () => {
  const { data } = useQuery({
    queryKey: CHAT_KEYS.SECONDARY_TOKEN(),
    queryFn: getSecondaryToken,
  });

  return { data };
};
