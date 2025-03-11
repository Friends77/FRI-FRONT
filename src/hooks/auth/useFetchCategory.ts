import { fetchCategory } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useFetchCategory = () => {
  return useQuery({
    queryKey: COMMON_KEYS.CATEGORY,
    queryFn: fetchCategory,
  });
};
