import { getPublicUserRecommendations } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import { HOME_CONSTANT } from '@/constants/home';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

const usePublicRecommendations = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return useQuery({
    queryKey: COMMON_KEYS.RECOMMENDED_USERS,
    queryFn: () =>
      getPublicUserRecommendations(HOME_CONSTANT.RECO_SIZE_DEFAULT),
    enabled: !isLoggedIn,
  });
};

export default usePublicRecommendations;
