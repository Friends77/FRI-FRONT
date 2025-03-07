import { FriendsStatus } from '@/types/chat';
import styled from 'styled-components';

export const UserCardWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray_200};
    border-radius: 16px;
  }
`;

export const UserCardInnerWrapper = styled.div<{ $isHovered: boolean }>`
  display: flex;
  width: ${({ $isHovered }) => ($isHovered ? '286px' : '100%')};
  overflow-x: hidden;
`;

// 프로필 이미지 + 닉네임 + 한줄소개
export const UserCardIntroSection = styled.section<{ $isHovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: ${({ $isHovered }) => ($isHovered ? '286px' : '100%')};
`;

// 프로필 이미지
export const UserCardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 999px;
`;

// 닉네임 + 한줄소개
export const UserCardInfoSection = styled.section<{ $isHovered: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: ${({ $isHovered }) => ($isHovered ? '210px' : '100%')};
`;

export const UserCardNickname = styled.span`
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const UserCardDescription = styled.span<{ $isHovered: boolean }>`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ $isHovered }) => ($isHovered ? 'ellipsis' : '')};
`;

export const UserCardButton = styled.button<{
  $friendState: FriendsStatus | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Blue_50};
  background-color: ${({ theme }) => theme.colors.Blue_400};
  border-radius: 8px;
  padding: 6px 6px 6px 4px;
  gap: 4px;
  cursor: ${({ $friendState }) =>
    $friendState === 'REQUESTED' && 'not-allowed'};
`;
