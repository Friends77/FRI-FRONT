/**
 * 친구 찾아보기 - 유저 카드
 * @author 선우
 */

import PersonAdd from '@/components/@common/SVG/Icon/PersonAdd';
import { IProfileSimpleResponse } from '@/types/user';
import { useState } from 'react';
import * as Styled from './UserCard.styled';
import useFriendRequest from '@/hooks/user/useFriendRequest';

export interface IUserCardProps {
  userInfo: IProfileSimpleResponse;
}

const UserCard = ({ userInfo }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { mutate: addFriend } = useFriendRequest({
    onSuccessHandler: () => {
      alert('친구 신청을 보냈어요!');
    },
  });

  const handleAddFriend = (friendId: number) => {
    addFriend(friendId);
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
      {isHovered && (
        <Styled.UserCardButton
          onClick={() => handleAddFriend(userInfo.memberId)}
        >
          <PersonAdd title="친구신청" width="21" height="14" />
          친구신청
        </Styled.UserCardButton>
      )}
    </Styled.UserCardWrapper>
  );
};

export default UserCard;
