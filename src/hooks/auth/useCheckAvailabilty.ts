import { checkAvailability } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useCheckAvailabilty = () => {
  return useMutation({
    mutationFn: checkAvailability,
  });
};
