import { ISentMessageItem } from '@/types/chat';
import * as Styled from './SystemMessage.styled';

interface ISystemMessageProps {
  message: ISentMessageItem;
}

const SystemMessage = ({ message }: ISystemMessageProps) => {
  return <Styled.SystemMessage>{message.content}</Styled.SystemMessage>;
};

export default SystemMessage;
