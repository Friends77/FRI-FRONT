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
  line-height: 32px;
  margin-bottom: 10px;
`;

export const RecommendedContent = styled.section`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const RecommendedContentWithMargin = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
`;

export const ChatRoomByTagSection = styled.div`
  width: 100%;
  margin-top: 16px;
`;

export const ChatRoomByTagTitleSection = styled.div`
  margin-bottom: 8px;
`;

export const ChatRoomByTagTitle = styled.h3`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const Highlight = styled.span`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Blue_500};
`;
