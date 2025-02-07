import { ISentMessageItem } from '@/types/chat';
import * as Styled from './OtherMessage.styled';
import { format } from 'date-fns';
import { CHAT_CONSTANT } from '@/constants/chat';
import { selectedImageMessageAtom } from '@/recoil/chat/message';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import chatMembersAtom from '@/recoil/chat/member';
import ProfileImage from '@/components/@common/ProfileImage';

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
  const chatMembers = useRecoilValue(chatMembersAtom);
  const setSelectedImageMessage = useSetRecoilState(selectedImageMessageAtom);

  const handleImageMessageClick = (index: number) => {
    setSelectedImageMessage({ selectedImageIndex: index, message });
  };

  const senderProfile = chatMembers.find(
    (member) => member.id === message.senderId,
  );

  return (
    <Styled.OtherMessageItem
      $isSameTime={isSameTime}
      $isSameSender={isSameSender}
    >
      {senderProfile && (
        <Styled.SenderProfile>
          <ProfileImage
            size={36}
            src={senderProfile.profileImageUrl}
            alt="프로필 이미지"
          />
          <Styled.SenderNickname>
            {senderProfile.nickname}
          </Styled.SenderNickname>
        </Styled.SenderProfile>
      )}
      <Styled.MessageContainer>
        {message.type === 'TEXT' && (
          <Styled.MessageContent>{message.content}</Styled.MessageContent>
        )}
        {message.type === 'IMAGE' && (
          <Styled.ImageMessageContainer>
            {message.content
              .split(',')
              .slice(0, CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES)
              .map((path, index) => (
                <Styled.ImageMessageButton
                  key={path}
                  type="button"
                  onClick={() => handleImageMessageClick(index)}
                >
                  <Styled.ImageMessageContent
                    key={path}
                    src={path}
                    alt="이미지 메세지"
                  />
                </Styled.ImageMessageButton>
              ))}
            {message.content.split(',').length >
              CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES && (
              <Styled.DimmedImage>{`+${
                message.content.split(',').length -
                CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES
              }`}</Styled.DimmedImage>
            )}
          </Styled.ImageMessageContainer>
        )}
        {isShowSendTime && (
          <Styled.SendTime>
            {format((message as ISentMessageItem).createdAt, 'h:mma')}
          </Styled.SendTime>
        )}
      </Styled.MessageContainer>
    </Styled.OtherMessageItem>
  );
};

export default OtherMessage;
