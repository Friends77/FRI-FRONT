import styled from 'styled-components';

export const FriendListByTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FriendListByTagTitleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FriendListByTagInnerWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const FriendListByTagTitle = styled.h1`
  ${({ theme }) => theme.typo.D2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
