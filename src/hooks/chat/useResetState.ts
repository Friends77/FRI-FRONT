import {
  failedMessageAtom,
  pendingMessageAtom,
  sentMessageAtom,
} from '@/recoil/chat/message';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import { useEffect } from 'react';
import { useRecoilTransaction_UNSTABLE } from 'recoil';

interface IUseResetState {
  roomId: number;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const useResetState = ({ roomId, setIsEnter }: IUseResetState) => {
  const resetChatState = useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    reset(sentMessageAtom);
    reset(pendingMessageAtom);
    reset(failedMessageAtom);
    reset(roomDetailAtom);
  });

  useEffect(() => {
    setIsEnter(false);
    resetChatState();
  }, [roomId]);
};

export default useResetState;
