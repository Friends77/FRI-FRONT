import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 60px;
`;

export const BannerTitle = styled.h3`
  ${({ theme }) => theme.typo.H1_B};
  color: ${({ theme }) => theme.colors.Gray_100};
  line-height: 30px;
  margin-bottom: 10px;
`;

export const RecommendedContent = styled.section`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ChatRoomByTagSection = styled.section`
  width: 100%;
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
