import { sentMessageAtom } from '@/recoil/chat/message';
import { IGetChatMessagesResponse, ISentMessageItem } from '@/types/chat';
import throttle from '@/utils/throttle';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useGetPreviousMessage from './useGetPreviousMessage';

interface IUseScrollHandler {
  roomId: number;
  messageListRef: React.RefObject<HTMLUListElement>;
  setPreviewMessage: (message: ISentMessageItem | null) => void;
  setIsShowPreviewMessage: (isShow: boolean) => void;
  lastMsgId: number | null;
  setLastMsgId: React.Dispatch<React.SetStateAction<number | null>>;
  isEnter: boolean;
  shouldFetchPreviousMessages: boolean;
  setShouldFetchPreviousMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

const useScrollHandler = ({
  roomId,
  messageListRef,
  setPreviewMessage,
  setIsShowPreviewMessage,
  lastMsgId,
  setLastMsgId,
  isEnter,
  shouldFetchPreviousMessages,
  setShouldFetchPreviousMessages,
}: IUseScrollHandler) => {
  const [sentMessageList, setSentMessageList] = useRecoilState(sentMessageAtom);

  const { data: messagesResponse } = useGetPreviousMessage({
    roomId,
    shouldFetchPreviousMessages,
    lastMessageId: lastMsgId || undefined,
  });

  useEffect(() => {
    if (isEnter) {
      setShouldFetchPreviousMessages(true);
    }
  }, [isEnter]);

  // messagesResponse 가 바뀌면 저장 후 스크롤을 움직인다.
  useEffect(() => {
    if (!messagesResponse) {
      return;
    }

    // sendMessages 상태를 업데이트
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

    // 최초입장일 때만
    // setLastMsgId(null);
    // setShouldFetchPreviousMessages(true);

    // 최초 메세지를 불러오고 스크롤을 조정한다.
    const loadMessagesAndScroll = async () => {
      const messageList = messageListRef.current;
      if (messagesResponse && messageList) {
        let isFirst = lastMsgId === null; // 최초호출인가
        const scrollHeightBefore = messageList.scrollHeight;
        await updateSentMessages(messagesResponse);
        // 최신 메시지 목록 가져오기
        if (isFirst) {
          messageList.scrollTo(0, messageList.scrollHeight);
        } else {
          requestAnimationFrame(() => {
            messageList.scrollTop =
              messageList.scrollHeight - scrollHeightBefore;
          });
        }
      }
    };

    loadMessagesAndScroll();
    setShouldFetchPreviousMessages(false);
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

        // 채팅방을 이동하면서 최상위에 도달한 것으로 이전 메시지를 호출하려고함
        if (messageList.scrollTop === 0 && sentMessageList.length !== 0) {
          setShouldFetchPreviousMessages(true);
        }
      }
    }, 100 * 5);
    messageList?.addEventListener('scroll', handleScroll);
    return () => {
      messageList?.removeEventListener('scroll', handleScroll);
    };
  }, [sentMessageList]);
};

export default useScrollHandler;
