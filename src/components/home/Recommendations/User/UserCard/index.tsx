import PersonAdd from '@/components/@common/SVG/Icon/PersonAdd';
import { IProfileSimpleResponse } from '@/types/user';
import { useState } from 'react';
import * as Styled from './UserCard.styled';
import useFriendRequest from '@/hooks/user/useFriendRequest';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { FriendsStatus } from '@/types/chat';

export interface IUserCardProps {
  userInfo: IProfileSimpleResponse;
  friendStatusType?: FriendsStatus;
}

const UserCard = ({ userInfo, friendStatusType }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // 친구 상태 관리
  const [friendState, setFriendState] = useState(friendStatusType);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { mutate: addFriend } = useFriendRequest({
    onSuccessHandler: () => {
      alert('친구 신청을 보냈어요!');
    },
  });

  const handleAddFriend = (friendId: number) => {
    addFriend(friendId);
    setFriendState(FriendsStatus.REQUESTED);
  };

  return (
    <Styled.UserCardWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Styled.UserCardInnerWrapper $isHovered={isHovered}>
        <Styled.UserCardIntroSection $isHovered={isHovered}>
          <Styled.UserCardImage src={userInfo.imageUrl} />
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
