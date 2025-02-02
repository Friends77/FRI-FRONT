import { sentMessageAtom } from '@/recoil/chat/message';
import { ISentMessageItem } from '@/types/chat';
import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useGetPreviousMessage from './useGetPreviousMessage';

interface IUseScrollHandler {
  roomId: number;
  lastMessageId: number | null;
  messageListRef: React.RefObject<HTMLUListElement>;
  setPreviewMessage: (message: ISentMessageItem | null) => void;
  setIsShowPreviewMessage: (isShow: boolean) => void;
}

const useScrollHandler = ({
  roomId,
  lastMessageId,
  messageListRef,
  setPreviewMessage,
  setIsShowPreviewMessage,
}: IUseScrollHandler) => {
  const [sentMessageList, setSentMessageList] = useRecoilState(sentMessageAtom);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [] = useState();

  const { data: messagesResponse } = useGetPreviousMessage({
    roomId,
    shouldFetchMessages,
  });

  useEffect(() => {
    const messageList = messageListRef.current;

    const handleScroll = throttle(() => {
      if (messageList) {
        const { scrollHeight, scrollTop, clientHeight } = messageList;
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

        if (scrollPercentage >= 0.95) {
          setPreviewMessage(null);
          setIsShowPreviewMessage(false);
        }

        if (messageList.scrollTop === 0 && sentMessageList.length > 0) {
          setShouldFetchMessages(true);
        }
      }
    }, 100 * 5);

    messageList?.addEventListener('scroll', handleScroll);

    return () => {
      messageList?.removeEventListener('scroll', handleScroll);
    };
  }, [sentMessageList]);

  useEffect(() => {
    if (shouldFetchMessages && messagesResponse) {
      console.log('##', messagesResponse);
      setShouldFetchMessages(false);
    }
  }, [messagesResponse, shouldFetchMessages]);
};

export default useScrollHandler;
