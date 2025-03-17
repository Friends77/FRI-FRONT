import defaultProfileImg from '@/assets/images/defaultProfile.png';
import PersonAdd from '@/components/@common/SVG/Icon/PersonAdd';
import { ISimpleUserProfile } from '@/types/user';
import { useState } from 'react';
import * as Styled from './UserCard.styled';
import useFriendRequest from '@/hooks/user/useFriendRequest';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { FriendsStatus } from '@/types/chat';
import { ALERT_MESSAGE } from '@/constants/message';

export interface IUserCardProps {
  userInfo: ISimpleUserProfile;
  friendStatusType?: FriendsStatus;
}

const UserCard = ({ userInfo, friendStatusType }: IUserCardProps) => {
  const [imageSrc, setImageSrc] = useState(userInfo.imageUrl);

  const [isHovered, setIsHovered] = useState(false);

  const [friendState, setFriendState] = useState(friendStatusType);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { mutate: addFriend } = useFriendRequest({
    onSuccessHandler: () => {
      alert(ALERT_MESSAGE.FRIEND_REQUEST_SENT);
    },
  });

  const handleAddFriend = (friendId: number) => {
    addFriend(friendId);
    setFriendState(FriendsStatus.REQUESTED);
  };

  const handleImageError = () => {
    setImageSrc(defaultProfileImg); // 이미지 로드 실패 시 fallback 이미지로 설정
  };

  return (
    <Styled.UserCardWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Styled.UserCardInnerWrapper $isHovered={isHovered}>
        <Styled.UserCardIntroSection $isHovered={isHovered}>
          <Styled.UserCardImage
            alt="프로필 이미지"
            src={imageSrc}
            onError={handleImageError}
          />
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
      {isHovered && isLoggedIn && (
        <Styled.UserCardButton
          onClick={() => handleAddFriend(userInfo.memberId)}
          disabled={friendState === 'REQUESTED'}
          $friendState={friendState}
        >
          {friendState === 'AVAILABLE' ? (
            <>
              <PersonAdd title="친구신청" width="21" height="14" /> 친구신청
            </>
          ) : (
            '수락 대기중'
          )}
        </Styled.UserCardButton>
      )}
    </Styled.UserCardWrapper>
  );
};

export default UserCard;
