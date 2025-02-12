import ProfileImage from '@/components/@common/ProfileImage';
import SideBarSearchInput from '@/components/@layout/SideBar/SideBarSearchInput';
import styled, { css } from 'styled-components';

interface IInvitationButton {
  $status: 'AVAILABLE' | 'INVITED';
}

export const InvitationDialog = styled.div`
  min-height: 448px;
`;

export const SearchInput = styled(SideBarSearchInput)`
  padding: 0;
  margin-top: 24px;
`;

export const EmptyFriendList = styled.div`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_700};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 380px;
`;

export const FriendList = styled.ul`
  padding-bottom: 8px;
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
`;

export const Description = styled.p`
  ${({ theme }) => theme.typo.B1_R};
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
