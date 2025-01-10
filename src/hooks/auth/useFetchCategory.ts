import { fetchCategory } from '@/apis/auth';
import { useQuery } from '@tanstack/react-query';

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });
};
