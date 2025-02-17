import styled from 'styled-components';

export const FriendCardArticle = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const FriendCardSpan = styled.span`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
