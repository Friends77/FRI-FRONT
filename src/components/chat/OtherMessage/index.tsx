import { ISentMessageItem } from '@/types/chat';
import * as Styled from './OtherMessage.styled';
import { format } from 'date-fns';

interface IOtherMessageProps {
  message: ISentMessageItem;
  isShowSendTime: boolean;
  isSameTime: boolean;
  isSameSender: boolean;
}

const OtherMessage = ({
  message,
  isShowSendTime,
  isSameTime,
  isSameSender,
}: IOtherMessageProps) => {
  return (
    <Styled.OtherMessageItem
      $isSameTime={isSameTime}
      $isSameSender={isSameSender}
    >
      {message.type === 'TEXT' && (
        <Styled.MessageContent>{message.content}</Styled.MessageContent>
      )}
      {message.type === 'IMAGE' && (
        <Styled.ImageMessageContent src={message.content} alt="이미지 메세지" />
      )}
      {isShowSendTime && (
        <Styled.SendTime>
          {format((message as ISentMessageItem).createdAt, 'h:mma')}
        </Styled.SendTime>
      )}
    </Styled.OtherMessageItem>
  );
};

export default OtherMessage;
