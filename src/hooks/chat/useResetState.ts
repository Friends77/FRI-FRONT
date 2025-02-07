import {
  failedMessageAtom,
  pendingMessageAtom,
  sentMessageAtom,
} from '@/recoil/chat/message';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import { useEffect } from 'react';
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
} from 'recoil';

interface IUseResetState {
  roomId: number;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const useResetState = ({ roomId, setIsEnter }: IUseResetState) => {
  const sentMessageList = useRecoilValue(sentMessageAtom);

  const resetChatState = useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    reset(sentMessageAtom);
    reset(pendingMessageAtom);
    reset(failedMessageAtom);
    reset(roomDetailAtom);
  });

  useEffect(() => {
    resetChatState();
    setIsEnter(false);
  }, [roomId]);
};

export default useResetState;
