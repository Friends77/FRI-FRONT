import { pulse } from '@/styles/animation';
import styled from 'styled-components';

export const SkeletonWrapper = styled.div`
  overflow-y: auto;
`;

export const SkeletonItem = styled.li`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 16px 24px;

  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const ChatRoomImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
`;

export const ChatRoomInfo = styled.div`
  flex-grow: 1;
`;

export const TitleAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const Title = styled.div`
  width: 200px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  border-radius: 20px;
`;

export const Time = styled.div`
  width: 36px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  border-radius: 20px;
`;

export const Message = styled.p`
  margin-top: 4px;
  width: 200px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  border-radius: 20px;
`;

export const ParticipantList = styled.ul`
  position: relative;
  display: flex;
  margin-top: 4px;
`;

export const ParticipantItem = styled.li<{ $index?: number }>`
  position: absolute;
  left: ${({ $index }) => $index && `${15 * $index}px`};
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Gray_100};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray_300};
`;
