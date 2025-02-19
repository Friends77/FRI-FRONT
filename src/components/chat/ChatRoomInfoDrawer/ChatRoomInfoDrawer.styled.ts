import ArrowDown from '@/components/@common/SVG/Icon/ArrowDown';
import { FriendsStatus } from '@/types/chat';
import styled, { css } from 'styled-components';

interface IChatRoomInfoDrawerProps {
  $isOpen: boolean;
}

interface IMemberName {
  $isMe: boolean;
}

interface IFriendStatus {
  $friendStatus: FriendsStatus;
}

export const ChatRoomInfoDrawerContainer = styled.aside<IChatRoomInfoDrawerProps>`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
`;

export const CloseButtonContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  display: flex;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const Categories = styled.ul`
  padding: 24px 20px;
`;

export const Album = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.Gray_300};
`;

export const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.typo.T2_R}
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const AlbumImageButton = styled.button`
  display: flex;
`;

export const AlbumContent = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 8px;
  padding: 0 20px 24px;
`;

export const AlbumImage = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 4px;
`;

export const MoreIconButton = styled.button`
  display: flex;
`;

export const MoreIcon = styled(ArrowDown)`
  transform: rotate(-90deg);
`;

export const Members = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.Gray_300};
`;

export const MembersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.typo.T2_R}
  padding: 8px 12px;
`;

export const MemberTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const MemberCount = styled.span`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_700};
`;

export const InvitationButton = styled.button`
  display: flex;
`;

export const MembersContent = styled.ul`
  padding: 16px 0;
  overflow-y: auto;
  max-height: 330px;
`;

export const Member = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 20px;
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ShowProfileButton = styled.button`
  display: flex;
  margin-right: 8px;
`;

export const MemberName = styled.div<IMemberName>`
  ${({ $isMe }) =>
    $isMe
      ? css`
          ${({ theme }) => theme.typo.B1_B};
        `
      : css`
          ${({ theme }) => theme.typo.B1_R};
        `}
`;

export const ManagerTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.Blue_500};
  width: 37px;
  height: 28px;
  color: ${({ theme }) => theme.colors.White};
  border-radius: 4px;
  ${({ theme }) => theme.typo.B2_R};
  margin-left: 8px;
`;

export const MemberFriendStatus = styled.button<IFriendStatus>`
  width: 106px;
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

export const ExitRoom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.White};
`;

export const ExitButton = styled.button`
  display: flex;
  margin-right: 20px;
`;
