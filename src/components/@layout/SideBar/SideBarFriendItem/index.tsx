import ProfileImage from '@/components/@common/ProfileImage';
import * as Styled from './SideBarFriendItem.styled';
import { IProfileSimpleResponse } from '@/types/user';
import { memo } from 'react';

interface ISideBarFriendItemProps {
  friend: IProfileSimpleResponse;
}

const SideBarFriendItem = ({ friend }: ISideBarFriendItemProps) => {
  const { imageUrl, nickname, selfDescription } = friend;

  return (
    <Styled.Wrapper>
      <ProfileImage
        src={imageUrl}
        alt={`${nickname} 프로필 이미지`}
        size={56}
      />
      <Styled.FriendInfo>
        <Styled.Nickname>{nickname}</Styled.Nickname>
        <Styled.SelfDescription>{selfDescription}</Styled.SelfDescription>
      </Styled.FriendInfo>
    </Styled.Wrapper>
  );
};

export default memo(SideBarFriendItem);
