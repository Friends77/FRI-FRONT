import { fetchCategory } from '@/apis/@common';
import { useQuery } from '@tanstack/react-query';

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });
};
