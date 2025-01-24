import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border-radius: 16px;
  padding: 8px;
  gap: 7px;
  background-color: ${({ theme }) => theme.colors.Gray_200};
  cursor: pointer;
`;

export const ImageContainer = styled.article`
  width: 100%;
  height: 184px;
`;

export const ChatRoomThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const ChatRoomInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatRoomTitle = styled.h3`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ChatRoomSubtitle = styled.h5`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ChatRoomTagSection = styled.ul`
  display: flex;
  gap: 6px;
  width: 100%;
`;
