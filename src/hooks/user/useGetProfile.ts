import { getProfile } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = (memberId: number) => {
  return useQuery({
    queryKey: USER_KEYS.PROFILE(memberId),
    queryFn: getProfile,
  });
};

export default useGetProfile;
