import { pulse } from '@/styles/animation';
import styled from 'styled-components';

export const SkeletonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonImg = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
`;

export const SkeletonNickname = styled.div`
  width: 140px;
  height: 26px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
`;
