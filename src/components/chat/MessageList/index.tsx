import { IPendingMessageItem, ISentMessageItem } from '@/types/chat';

interface IMessageListProps {
  pendingMessageList: IPendingMessageItem[];
  sentMessageList: ISentMessageItem[];
  failedMessageList: IPendingMessageItem[];
  onResendMessage: (clientMessageId: string) => void;
  onDeleteMessage: (clientMessageId: string) => void;
}

const MessageList = ({
  pendingMessageList,
  sentMessageList,
  failedMessageList,
  onResendMessage,
  onDeleteMessage,
}: IMessageListProps) => {
  return (
    <ul>
      {sentMessageList.map((sentMessage) => (
        <li key={sentMessage.createdAt}>{sentMessage.content}</li>
      ))}
      {pendingMessageList.map((pendingMessage) => (
        <li key={pendingMessage.clientMessageId}>{pendingMessage.content}</li>
      ))}
      {failedMessageList.map((failedMessage) => (
        <li key={failedMessage.clientMessageId}>
          <button
            onClick={() => onResendMessage(failedMessage.clientMessageId)}
          >
            재전송
          </button>
          <button
            onClick={() => onDeleteMessage(failedMessage.clientMessageId)}
          >
            삭제
          </button>
          {failedMessage.content}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
