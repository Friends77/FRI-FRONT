import styled from 'styled-components';

export const RecommendedContent = styled.section`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const ChatRoomByTagSection = styled.section`
  width: 865px;
  height: 904px;
`;

export const ChatRoomByTagTitleSection = styled.section`
  margin-bottom: 8px;
`;

export const ChatRoomByTagTitle = styled.h1`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const Highlight = styled.span`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Blue_500};
`;
