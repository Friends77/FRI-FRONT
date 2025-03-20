import { ISimpleUserProfile } from '@/types/user';
import { useState } from 'react';
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

export interface IUserCardProps {
  userInfo: ISimpleUserProfile;
  friendStatusType?: FriendsStatus;
}

const UserCard = ({ userInfo, friendStatusType }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <Styled.UserCardWrapper
      $type={
        myTagLength <
        HOME_CONSTANT.FRIEND_RECOMMENDATION_WITH_INTEREST_CARD_LIMIT
          ? 'row'
          : 'column'
      }
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Styled.UserCardInnerWrapper $isHovered={isHovered}>
        <Styled.UserCardIntroSection $isHovered={isHovered}>
          <ProfileImage src={userInfo.imageUrl} size={60} />
          <Styled.UserCardInfoSection $isHovered={isHovered}>
            <Styled.UserCardNickname>
              {userInfo.nickname}
            </Styled.UserCardNickname>
            <Styled.UserCardDescription $isHovered={isHovered}>
              {userInfo.selfDescription}
            </Styled.UserCardDescription>
          </Styled.UserCardInfoSection>
        </Styled.UserCardIntroSection>
      </Styled.UserCardInnerWrapper>
      {isHovered &&
        isLoggedIn &&
        (friendState === FriendsStatus.AVAILABLE ||
          friendState === FriendsStatus.REQUESTED) && (
          <Styled.MemberFriendStatus
            onClick={() => handleAddFriend(userInfo.memberId)}
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
  );
};

export default UserCard;
