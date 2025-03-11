import { getPrivateUserRecommendations } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

const usePrivateRecommendations = (size: number) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return useQuery({
    queryKey: COMMON_KEYS.RECOMMENDED_USERS,
    queryFn: () => getPrivateUserRecommendations(size),
    enabled: size !== 0 && !!isLoggedIn,
  });
};

export default usePrivateRecommendations;
