import { format } from 'date-fns';
import * as Styled from './DateMessage.styled';

interface IDateMessageProps {
  timestamp: number;
}

const DateMessage = ({ timestamp }: IDateMessageProps) => {
  return (
    <Styled.DateMessage>{format(timestamp, 'yyyy.MM.dd')}</Styled.DateMessage>
  );
};

export default DateMessage;
