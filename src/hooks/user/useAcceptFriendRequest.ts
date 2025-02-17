import { acceptFriendRequest } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_KEYS.ALARM_LIST,
      });
    },
    onError: () => {
      alert('친구요청 수락을 실패했습니다.');
    },
  });
};

export default useAcceptFriendRequest;
