import { getSecondaryToken } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useGetSecondaryToken = () => {
  const [secondaryToken, setSecondaryToken] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: getSecondaryToken,
    onSuccess: ({ secondaryToken }) => {
      setSecondaryToken(secondaryToken);
    },
    onError: (error) => {
      console.log(error);
      console.log('2차 토큰 생성실패');
    },
  });

  return { secondaryToken, mutate };
};
