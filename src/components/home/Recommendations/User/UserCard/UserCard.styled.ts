import { FriendsStatus } from '@/types/chat';
import styled, { css } from 'styled-components';

interface IUserCardWrapper {
  $type: 'row' | 'column';
}

interface IFriendStatus {
  $friendStatus: FriendsStatus;
}

export const UserCardWrapper = styled.li<IUserCardWrapper>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  width: 100%;

  ${({ $type }) =>
    $type === 'column' &&
    css`
      width: 370px;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray_200};
  }
`;

export const UserCardInnerWrapper = styled.div<{ $isHovered: boolean }>`
  display: flex;
  width: ${({ $isHovered }) => ($isHovered ? '286px' : '100%')};
  overflow-x: hidden;
`;

// 프로필 이미지 + 닉네임 + 한줄소개
export const UserCardIntroSection = styled.div<{ $isHovered: boolean }>`
  display: flex;
  align-items: center;

  width: ${({ $isHovered }) => ($isHovered ? '286px' : '100%')};
`;

// 닉네임 + 한줄소개
export const UserCardInfoSection = styled.div<{ $isHovered: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserCardNickname = styled.span`
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-left: 16px;
`;

export const UserCardDescription = styled.span<{ $isHovered: boolean }>`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ $isHovered }) => ($isHovered ? 'ellipsis' : '')};
`;

export const MemberFriendStatus = styled.button<IFriendStatus>`
  min-width: 106px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $friendStatus }) =>
    $friendStatus === FriendsStatus.AVAILABLE &&
    css`
      ${({ theme }) => theme.typo.B1_B};
      background-color: ${({ theme }) => theme.colors.Blue_400};
      color: ${({ theme }) => theme.colors.White};
      gap: 4px;
    `}

  ${({ $friendStatus }) =>
    $friendStatus === FriendsStatus.REQUESTED &&
    css`
      ${({ theme }) => theme.typo.B1_R};
      color: ${({ theme }) => theme.colors.Gray_800};
      background-color: ${({ theme }) => theme.colors.Gray_300};
    `}

  &:disabled {
    cursor: not-allowed;
  }
`;
