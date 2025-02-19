import styled from 'styled-components';
import { lineClamp } from '../SideBarChatRoomItem/SideBarChatRoomItem.styled';

export const Wrapper = styled.li`
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.White};
  }
`;

export const ShowProfileButton = styled.button`
  display: flex;
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Nickname = styled.p`
  ${({ theme }) => theme.typo.T2_B};
  max-width: 200px;
  color: ${({ theme }) => theme.colors.Gray_1000};
  ${lineClamp(1)}
`;

export const SelfDescription = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  max-width: 200px;
  color: ${({ theme }) => theme.colors.Gray_900};
  ${lineClamp(1)}
`;
