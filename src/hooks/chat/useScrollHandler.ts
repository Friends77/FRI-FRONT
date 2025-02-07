import { sentMessageAtom } from '@/recoil/chat/message';
import { IGetChatMessagesResponse, ISentMessageItem } from '@/types/chat';
import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useGetPreviousMessage from './useGetPreviousMessage';

interface IUseScrollHandler {
  roomId: number;
  isEnter: boolean;
  messageListRef: React.RefObject<HTMLUListElement>;
  setPreviewMessage: (message: ISentMessageItem | null) => void;
  setIsShowPreviewMessage: (isShow: boolean) => void;
}

const useScrollHandler = ({
  roomId,
  isEnter,
  messageListRef,
  setPreviewMessage,
  setIsShowPreviewMessage,
}: IUseScrollHandler) => {
  const setSentMessageList = useSetRecoilState(sentMessageAtom);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [lastMsgId, setLastMsgId] = useState<number | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  const { data: messagesResponse } = useGetPreviousMessage({
    roomId,
    shouldFetchMessages,
    lastMessageId: lastMsgId || undefined,
  });

  useEffect(() => {
    setLastMsgId(null);
  }, [roomId]);

  useEffect(() => {
    if (isEnter && isFirst) {
      setShouldFetchMessages(true);
      setIsFirst(false);
    }
  }, [isEnter, isFirst]);

  useEffect(() => {
    const updateSentMessages = async (
      messagesResponse: IGetChatMessagesResponse,
    ) => {
      if (messagesResponse.content.length === 0) return;

      setLastMsgId(messagesResponse.content[0].messageId);

      setSentMessageList((prevList) => [
        ...messagesResponse.content,
        ...prevList,
      ]);
    };

    const loadMessagesAndScroll = async () => {
      const messageList = messageListRef.current;

      if (messagesResponse && messageList) {
        // let isFirst = !lastMsgId;

        const scrollHeightBefore = messageList.scrollHeight;

        await updateSentMessages(messagesResponse);

        if (messageList) {
          if (isFirst) {
            messageList.scrollTo(0, messageList.scrollHeight);
          }

          if (!isFirst) {
            requestAnimationFrame(() => {
              messageList.scrollTop =
                messageList.scrollHeight - scrollHeightBefore;
            });
          }
        }
      }
    };

    loadMessagesAndScroll();

    setShouldFetchMessages(false);
  }, [messagesResponse]);

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

        if (messageList.scrollTop === 0) {
          setShouldFetchMessages(true);
        }
      }
    }, 100 * 5);

    messageList?.addEventListener('scroll', handleScroll);

    return () => {
      messageList?.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollHandler;
