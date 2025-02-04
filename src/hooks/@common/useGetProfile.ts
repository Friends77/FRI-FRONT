import { getUserProfile } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = (memberId: number | null) => {
  return useQuery({
    queryKey: COMMON_KEYS.USER_PROFILE(memberId!),
    queryFn: () => getUserProfile(memberId!),
    enabled: !!memberId,
  });
};

export default useGetProfile;
