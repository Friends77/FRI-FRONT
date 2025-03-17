import { getProfile } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetMyProfile = () => {
  return useQuery({
    queryKey: USER_KEYS.MY_PROFILE,
    queryFn: getProfile,
  });
};

export default useGetMyProfile;
