import { ISentMessageItem, MessageType } from '@/types/chat';
import * as Styled from './OtherMessage.styled';
import { format } from 'date-fns';
import { CHAT_CONSTANT } from '@/constants/chat';
import { selectedImageMessageAtom } from '@/recoil/chat/message';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import chatMembersAtom from '@/recoil/chat/member';
import ProfileImage from '@/components/@common/ProfileImage';
import { useEffect, useState } from 'react';
import { IUserProfile } from '@/types/@common';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';
import useGetProfile from '@/hooks/@common/useGetProfile';

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

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );

  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
    null,
  );

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const { data: userProfile } = useGetProfile(selectedProfileId);

  const handleImageMessageClick = (index: number) => {
    setSelectedImageMessage({ selectedImageIndex: index, message });
  };

  const senderProfile = chatMembers.find(
    (member) => member.id === message.senderId,
  );

  const handleOpenProfile = (memberId: number) => {
    setSelectedProfileId(memberId);
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedProfileId(null);
    setSelectedProfile(null);
    setIsOpenProfile(false);
  };

  useEffect(() => {
    if (userProfile) {
      setSelectedProfile(userProfile);
    }
  }, [userProfile]);

  return (
    <>
      {isOpenProfile && selectedProfile && (
        <ProfileDialog profile={selectedProfile} onClose={handleCloseProfile} />
      )}
      <Styled.OtherMessageItem
        $isSameTime={isSameTime}
        $isSameSender={isSameSender}
      >
        {senderProfile && (
          <Styled.ProfileButton
            type="button"
            onClick={() => handleOpenProfile(senderProfile.id)}
          >
            <ProfileImage
              size={36}
              src={senderProfile.profileImageUrl}
              alt="프로필 이미지"
            />
          </Styled.ProfileButton>
        )}

        <Styled.SenderProfile>
          {senderProfile && (
            <Styled.SenderNickname>
              {senderProfile.nickname}
            </Styled.SenderNickname>
          )}
          <Styled.MessageContainer>
            {message.type === MessageType.TEXT && (
              <Styled.MessageContent>{message.content}</Styled.MessageContent>
            )}
            {message.type === MessageType.IMAGE && (
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
        </Styled.SenderProfile>

        {/* </Styled.ProfileButton>
          <Styled.SenderProfile>
            <Styled.ProfileButton
              type="button"
              onClick={() => handleOpenProfile(senderProfile.id)}
            >
              <ProfileImage
                size={36}
                src={senderProfile.profileImageUrl}
                alt="프로필 이미지"
              />
            </Styled.ProfileButton>
            <Styled.SenderNickname>
              {senderProfile.nickname}
            </Styled.SenderNickname>
          </Styled.SenderProfile> */}
      </Styled.OtherMessageItem>
    </>
  );
};

export default OtherMessage;
