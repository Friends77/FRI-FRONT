import ProfileImage from '@/components/@common/ProfileImage';
import * as Styled from './SideBarFriendItem.styled';
import { IProfileSimpleResponse } from '@/types/user';
import { memo, useEffect, useState } from 'react';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';
import { IUserProfile } from '@/types/@common';
import useGetProfile from '@/hooks/@common/useGetProfile';

interface ISideBarFriendItemProps {
  friend: IProfileSimpleResponse;
}

const SideBarFriendItem = ({ friend }: ISideBarFriendItemProps) => {
  const { imageUrl, nickname, selfDescription } = friend;

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );

  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
    null,
  );

  const { data: userProfile } = useGetProfile(selectedProfileId);

  useEffect(() => {
    if (userProfile) {
      setSelectedProfile(userProfile);
    }
  }, [userProfile]);

  const handleOpenProfile = (memberId: number) => {
    setSelectedProfileId(memberId);
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedProfileId(null);
    setSelectedProfile(null);
    setIsOpenProfile(false);
  };

  return (
    <>
      {isOpenProfile && selectedProfile && (
        <ProfileDialog profile={selectedProfile} onClose={handleCloseProfile} />
      )}
      <Styled.Wrapper>
        <Styled.ShowProfileButton
          type="button"
          onClick={() => handleOpenProfile(friend.memberId)}
        >
          <ProfileImage
            src={imageUrl}
            alt={`${nickname} 프로필 이미지`}
            size={56}
          />
        </Styled.ShowProfileButton>
        <Styled.FriendInfo>
          <Styled.Nickname>{nickname}</Styled.Nickname>
          {selfDescription && (
            <Styled.SelfDescription>{selfDescription}</Styled.SelfDescription>
          )}
        </Styled.FriendInfo>
      </Styled.Wrapper>
    </>
  );
};

export default memo(SideBarFriendItem);
