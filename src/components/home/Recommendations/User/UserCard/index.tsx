import { ISimpleUserProfile } from '@/types/user';
import { useEffect, useState } from 'react';
import * as Styled from './UserCard.styled';
import useFriendRequest from '@/hooks/user/useFriendRequest';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { FriendsStatus } from '@/types/chat';
import { ALERT_MESSAGE } from '@/constants/message';
import ProfileImage from '@/components/@common/ProfileImage';
import AddFriend from '@/components/@common/SVG/Icon/AddFriend';
import useGetTagLength from '@/hooks/home/useGetTagLength';
import { HOME_CONSTANT } from '@/constants/home';
import { IUserProfile } from '@/types/@common';
import useGetProfile from '@/hooks/@common/useGetProfile';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';

export interface IUserCardProps {
  profile: ISimpleUserProfile;
  friendStatusType?: FriendsStatus;
}

const UserCard = ({ profile, friendStatusType }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );

  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
    null,
  );

  const { data: userProfile } = useGetProfile(selectedProfileId);

  const [friendState, setFriendState] = useState(friendStatusType);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const myTagLength = useGetTagLength();

  const { mutate: addFriend } = useFriendRequest({
    onSuccessHandler: () => {
      alert(ALERT_MESSAGE.FRIEND_REQUEST_SENT);
    },
  });

  const handleAddFriend = (friendId: number) => {
    addFriend(friendId);
    setFriendState(FriendsStatus.REQUESTED);
  };

  const handleOpenProfile = (memberId: number) => {
    if (isLoggedIn) {
      setSelectedProfileId(memberId);
      setIsOpenProfile(true);
    }
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
      <Styled.UserCardWrapper
        $type={
          myTagLength < HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD
            ? 'row'
            : 'column'
        }
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Styled.UserCardInnerWrapper $isHovered={isHovered}>
          <Styled.UserCardIntroSection $isHovered={isHovered}>
            <button
              type="button"
              disabled={!isLoggedIn}
              onClick={() => handleOpenProfile(profile.memberId)}
            >
              <ProfileImage src={profile.imageUrl} size={60} />
            </button>
            <Styled.UserCardInfoSection $isHovered={isHovered}>
              <Styled.UserCardNickname>
                {profile.nickname}
              </Styled.UserCardNickname>
              <Styled.UserCardDescription $isHovered={isHovered}>
                {profile.selfDescription}
              </Styled.UserCardDescription>
            </Styled.UserCardInfoSection>
          </Styled.UserCardIntroSection>
        </Styled.UserCardInnerWrapper>
        {isHovered &&
          isLoggedIn &&
          (friendState === FriendsStatus.AVAILABLE ||
            friendState === FriendsStatus.REQUESTED) && (
            <Styled.MemberFriendStatus
              onClick={() => handleAddFriend(profile.memberId)}
              disabled={friendState === FriendsStatus.REQUESTED}
              $friendStatus={friendState}
            >
              {friendState === FriendsStatus.AVAILABLE && (
                <>
                  <AddFriend title="친구 신청" width="24" height="24" />
                  친구신청
                </>
              )}
              {friendState === FriendsStatus.REQUESTED && '수락 대기중'}
            </Styled.MemberFriendStatus>
          )}
      </Styled.UserCardWrapper>
    </>
  );
};

export default UserCard;
