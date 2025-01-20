import { pulse } from '@/styles/animation';
import styled from 'styled-components';

export const SkeletonWrapper = styled.div`
  overflow-y: auto;
`;

export const SkeletonItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;

  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const ProfileImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Nickname = styled.p`
  width: 150px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  border-radius: 20px;
`;

export const SelfDescription = styled.p`
  width: 200px;
  height: 19px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  border-radius: 20px;
`;
