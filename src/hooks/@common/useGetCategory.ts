import { getCategory } from '@/apis/@common';
import { COMMON_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCategory = () => {
  return useQuery({
    queryKey: COMMON_KEYS.CATEGORY,
    queryFn: getCategory,
  });
};

export default useGetCategory;
