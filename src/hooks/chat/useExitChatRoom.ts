import { exitChatRoom } from '@/apis/chat';
import { ROOT_PATH } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useExitChatRoom = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: exitChatRoom,
    onSuccess: () => {
      navigate(ROOT_PATH.ROOT);
    },
  });
};

export default useExitChatRoom;
