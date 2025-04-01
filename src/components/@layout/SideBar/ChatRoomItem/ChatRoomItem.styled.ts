import styled, { css } from 'styled-components';

export const Wrapper = styled.li<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected && theme.colors.White};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.White};
  }
`;

export const ChatRoomImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  object-fit: cover;
`;

export const ChatRoomInfo = styled.div`
  flex-grow: 1;
`;

export const TitleAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 4px;
`;

export const lineClamp = (count: number) => css`
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${count};
`;

export const Title = styled.h4`
  ${({ theme }) => theme.typo.B1_B};
  max-width: 200px;
  color: ${({ theme }) => theme.colors.Gray_1000};
  ${lineClamp(1)}
`;

export const Time = styled.time`
  ${({ theme }) => theme.typo.B2_R};
  color: ${({ theme }) => theme.colors.Gray_800};
`;

export const Message = styled.p`
  ${({ theme }) => theme.typo.B2_R};
  max-width: 200px;
  height: 20px;
  color: ${({ theme }) => theme.colors.Gray_900};
  ${lineClamp(1)}
`;

export const ParticipantList = styled.ul`
  position: relative;
  display: flex;
  margin-top: 4px;
`;

export const ParticipantItem = styled.li<{ $index?: number }>`
  position: absolute;
  left: ${({ $index }) => $index && `${15 * $index}px`};
`;

export const ParticipantCount = styled.div`
  ${({ theme }) => theme.typo.Label_R};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Gray_100};
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.Gray_100};
  background-color: ${({ theme }) => theme.colors.Gray_800};
`;

export const UnreadCountContainer = styled.div`
  ${({ theme }) => theme.typo.B2_R};
  position: absolute;
  right: 24px;
  bottom: 30.5px;
  padding: 2px 7.5px;
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Alter_error};
  border-radius: 999px;
`;

export const Loader = styled.div`
  margin: 0 auto;
`;
