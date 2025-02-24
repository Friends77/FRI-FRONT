import ProfileImage from '@/components/@common/ProfileImage';
import SideBarSearchInput from '@/components/@layout/SideBar/SideBarSearchInput';
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

interface IInvitationButton {
  $status: 'AVAILABLE' | 'INVITED';
}

export const InvitationDialog = styled.div`
  height: 380px;
  margin-bottom: 24px;
`;

export const SearchInput = styled(SideBarSearchInput)`
  padding: 0;
  margin-top: 24px;
  padding: 0 24px;
`;

export const EmptyFriendList = styled.div`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_700};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  gap: 4px;
  padding-bottom: 48px;
`;

export const FindFriendButton = styled(Link)`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Blue_500};
  padding: 5px 12px;
  display: flex;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.Blue_500};
  border-radius: 999px;
`;

export const FriendList = styled.ul`
  max-height: 310px;
  overflow-y: auto;
  padding: 0 24px;
`;

export const FriendItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled(ProfileImage)`
  margin-right: 16px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Nickname = styled.div`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const Description = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
`;

export const InvitationButton = styled.button<IInvitationButton>`
  width: 106px;
  height: 36px;
  ${({ theme }) => theme.typo.B1_R};

  ${({ $status }) =>
    $status === 'AVAILABLE' &&
    css`
      color: ${({ theme }) => theme.colors.Gray_900};
      border: 1px solid ${({ theme }) => theme.colors.Blue_400};
      border-radius: 8px;
    `}

  ${({ $status }) =>
    $status === 'INVITED' &&
    css`
      color: ${({ theme }) => theme.colors.Gray_600};
    `}

  &:disabled {
    cursor: not-allowed;
  }
`;
