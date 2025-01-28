import { ISentMessageItem } from '@/types/chat';
import * as Styled from './PreviewMessage.styled';
import ArrowDown from '@/components/@common/SVG/Icon/ArrowDown';

interface IPreviewMessage {
  message: ISentMessageItem;
  onClick: () => void;
}

const PreviewMessage = ({ message, onClick }: IPreviewMessage) => {
  // TODO: 프로필 추가하기
  return (
    <Styled.PreviewMessageContainer onClick={onClick}>
      <Styled.PreviewMessage>
        {message.type === 'TEXT' && message.content}
        {message.type === 'IMAGE' && '사진이 도착했어요'}
        <ArrowDown title="메세지 보기" width="24" height="24" />
      </Styled.PreviewMessage>
    </Styled.PreviewMessageContainer>
  );
};

export default PreviewMessage;
