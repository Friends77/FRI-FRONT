/**
 * 친구 찾아보기 - 유저 카드
 * @author 선우
 */

import PersonAdd from '@/components/@common/SVG/Icon/PersonAdd';
import { IRecommendedUsers } from '@/types/@common';
import { ReactEventHandler, useState } from 'react';
import * as Styled from './UserCard.styled';
import defaultProfileImg from '@/assets/images/defaultProfile.png';

export interface IUserCardProps {
  userInfo: IRecommendedUsers['content'][0];
}

const UserCard = ({ userInfo }: IUserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultProfileImg;
  };

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
        <Styled.UserCardImage
          src={userInfo.imageUrl}
          onError={handleImgError}
        />
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
