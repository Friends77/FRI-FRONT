import { updateProfile } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { ALERT_MESSAGE } from '@/constants/message';
import { ROOT_PATH } from '@/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useUpdateProfile = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert(ALERT_MESSAGE.CHANGES_SAVED);
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.MY_PROFILE,
      });
      navigate(ROOT_PATH.ROOT);
    },
  });
};

export default useUpdateProfile;
