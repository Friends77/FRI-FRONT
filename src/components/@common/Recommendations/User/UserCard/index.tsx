/**
 * 친구 찾아보기 - 유저 카드
 * @author 선우
 */

import PersonAdd from '@/components/@common/SVG/Icon/PersonAdd';
import { IProfileSimpleResponse } from '@/types/user';
import { useState } from 'react';
import * as Styled from './UserCard.styled';

export interface IUserCardProps {
  userInfo: IProfileSimpleResponse;
}

const UserCard = ({ userInfo }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // TO-DO: 친구 추가 API 연동
  const handleButtonClick = () => {
    console.log('친구 추가');
  };

  return (
    <Styled.UserCardWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Styled.UserCardIntroSection>
        <Styled.UserCardImage src={userInfo.imageUrl} />
        <Styled.UserCardInfoSection>
          <Styled.UserCardNickname>{userInfo.nickname}</Styled.UserCardNickname>
          <Styled.UserCardDescription $isHovered={isHovered}>
            {userInfo.selfDescription}
          </Styled.UserCardDescription>
        </Styled.UserCardInfoSection>
      </Styled.UserCardIntroSection>
      {isHovered && (
        <Styled.UserCardButton onClick={handleButtonClick}>
          <PersonAdd title="친구신청" width="21" height="14" />
          친구신청
        </Styled.UserCardButton>
      )}
    </Styled.UserCardWrapper>
  );
};

export default UserCard;
