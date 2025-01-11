import { IChatMessageItem } from '@/types/chat';

interface IMessageListProps {
  messages: IChatMessageItem[];
}

const MessageList = ({ messages }: IMessageListProps) => (
  <ul>
    {messages.map((message) => (
      <li key={message.sendTime}>{message.message}</li>
    ))}
  </ul>
);

export default MessageList;
