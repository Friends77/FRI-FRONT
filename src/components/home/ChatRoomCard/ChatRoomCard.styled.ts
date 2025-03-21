import styled from 'styled-components';

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 8px;
  gap: 7px;
  background-color: ${({ theme }) => theme.colors.Gray_200};
  cursor: pointer;
  width: 280px;
  height: 327px;
`;

export const ChatRoomThumbnail = styled.img`
  width: 100%;
  max-width: 264px;
  max-height: 184px;
  border-radius: 10px;
  margin-bottom: 6px;
`;

export const ChatRoomInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatRoomTitle = styled.h3`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ChatRoomSubtitle = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ChatRoomTagSection = styled.ul`
  display: flex;
  gap: 6px;
  width: 100%;
`;

export const ChatRoomParticipantList = styled.ul`
  display: flex;
  padding-left: 10px;
`;

export const ParticipantItem = styled.li<{ $index?: number }>`
  display: flex;
  margin-left: -10px;
`;
