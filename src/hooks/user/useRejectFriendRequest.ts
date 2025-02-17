import { rejectFriendRequest } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_KEYS.ALARM_LIST,
      });
    },
    onError: () => {
      alert('친구요청 거절을 실패했습니다.');
    },
  });
};

export default useRejectFriendRequest;
