import { ISentMessageItem } from '@/types/chat';
import * as Styled from './PreviewMessage.styled';
import ProfileImage from '@/components/@common/ProfileImage';
import { useRecoilValue } from 'recoil';
import chatMembersAtom from '@/recoil/chat/member';

interface IPreviewMessage {
  message: ISentMessageItem;
  onClick: () => void;
}

const PreviewMessage = ({ message, onClick }: IPreviewMessage) => {
  const chatMembers = useRecoilValue(chatMembersAtom);

  const senderProfile = chatMembers.find(
    (member) => member.id === message.senderId,
  );

  console.log(chatMembers);

  return (
    <Styled.PreviewMessageContainer onClick={onClick}>
      <Styled.PreviewMessage>
        <Styled.MemberProfile>
          <ProfileImage
            size={36}
            src={senderProfile?.profileImageUrl}
            alt="프로필 이미지"
          />
          <Styled.MemberName>{senderProfile?.nickname}</Styled.MemberName>
        </Styled.MemberProfile>
        <Styled.PreviewMessageContent>
          <Styled.Content>
            {message.type === 'TEXT' && message.content}
            {message.type === 'IMAGE' && '사진'}
          </Styled.Content>
          <Styled.ArrowDownIcon
            title="메세지 보기"
            width="24"
            height="24"
          ></Styled.ArrowDownIcon>
        </Styled.PreviewMessageContent>
      </Styled.PreviewMessage>
    </Styled.PreviewMessageContainer>
  );
};

export default PreviewMessage;
