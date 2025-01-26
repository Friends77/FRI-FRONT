import { checkAvailability } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useCheckAvailability = () => {
  return useMutation({
    mutationFn: checkAvailability,
  });
};
