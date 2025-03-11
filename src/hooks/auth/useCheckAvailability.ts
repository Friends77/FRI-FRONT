import { checkAvailability } from '@/apis/auth';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

interface IUseCheckAvailability {
  type: 'email' | 'nickname';
  value: string;
}

export const useCheckAvailability = ({
  type,
  value,
}: IUseCheckAvailability) => {
  return useQuery({
    queryKey: [USER_KEYS.CHECK_AVAILABILITY, type, value],
    queryFn: () => checkAvailability({ type, value }),
    enabled: !!value,
  });
};
