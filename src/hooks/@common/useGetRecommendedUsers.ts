/**
 * 추천 유저 API 연동
 */

import { getUserRecommendations } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetUserRecommendations = (size: number) => {
  return useQuery({
    queryKey: COMMON_KEYS.RECOMMENDED_USRES,
    queryFn: () => getUserRecommendations(size),
    enabled: size !== 0,
  });
};

export default useGetUserRecommendations;
