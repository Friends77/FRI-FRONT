import { ISentMessageItem } from '@/types/chat';
import throttle from '@/utils/throttle';
import { useEffect } from 'react';

interface IUseScrollHandler {
  messageListRef: React.RefObject<HTMLUListElement>;
  setPreviewMessage: (message: ISentMessageItem | null) => void;
  setIsShowPreviewMessage: (isShow: boolean) => void;
}

const useScrollHandler = ({
  messageListRef,
  setPreviewMessage,
  setIsShowPreviewMessage,
}: IUseScrollHandler) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (messageListRef.current) {
        const { scrollHeight, scrollTop, clientHeight } =
          messageListRef.current;
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

        if (scrollPercentage >= 0.95) {
          setPreviewMessage(null);
          setIsShowPreviewMessage(false);
        }
      }
    }, 100 * 5);

    messageListRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      messageListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollHandler;
