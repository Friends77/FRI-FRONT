import { sentMessageAtom } from '@/recoil/chat/message';
import { IGetChatMessagesResponse, ISentMessageItem } from '@/types/chat';
import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useGetPreviousMessage from './useGetPreviousMessage';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import { CHAT_CONSTANT } from '@/constants/chat';

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
  const chatRoomDetail = useRecoilValue(roomDetailAtom);
  const [sentMessageList, setSentMessageList] = useRecoilState(sentMessageAtom);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [lastMsgId, setLastMsgId] = useState<number | null>(
    chatRoomDetail?.lastMessageId || null,
  );

  useEffect(() => {
    setLastMsgId(null);
  }, [roomId]);

  const { data: messagesResponse } = useGetPreviousMessage({
    roomId,
    shouldFetchMessages,
    size: CHAT_CONSTANT.DEFAULT_MESSAGE_SIZE,
    lastMessageId: lastMsgId || undefined,
  });

  const updateSentMessages = async (
    messagesResponse: IGetChatMessagesResponse,
  ) => {
    setLastMsgId(messagesResponse.content[0].messageId);

    setSentMessageList((prevList) => [
      ...messagesResponse.content,
      ...prevList,
    ]);
  };

  useEffect(() => {
    if (chatRoomDetail) {
      setLastMsgId(chatRoomDetail.lastMessageId);
    }
  }, [chatRoomDetail]);

  useEffect(() => {
    if (isEnter) {
      setShouldFetchMessages(true);
    }
  }, [isEnter]);

  useEffect(() => {
    const loadMessagesAndScroll = async () => {
      const messageList = messageListRef.current;

      if (messagesResponse && messageList) {
        let isFirst = sentMessageList.length === 0;

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
  }, [messagesResponse, roomId]);

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
