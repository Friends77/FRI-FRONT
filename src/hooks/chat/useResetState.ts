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
  setLastMsgId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldFetchPreviousMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

const useResetState = ({
  roomId,
  setLastMsgId,
  setIsEnter,
  setShouldFetchPreviousMessages,
}: IUseResetState) => {
  const resetChatState = useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    setShouldFetchPreviousMessages(false);
    setLastMsgId(null);
    setIsEnter(false);
    reset(sentMessageAtom);
    reset(pendingMessageAtom);
    reset(failedMessageAtom);
    reset(roomDetailAtom);
  });

  useEffect(() => {
    resetChatState();
  }, [roomId]);
};

export default useResetState;
