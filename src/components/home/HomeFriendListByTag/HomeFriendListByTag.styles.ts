import styled from 'styled-components';

export const FriendListByTagWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const FriendListByTagTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FriendListByTagInnerWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const FriendListByTagTitle = styled.h3`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
