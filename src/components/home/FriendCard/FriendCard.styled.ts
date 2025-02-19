import styled from 'styled-components';

export const FriendCardArticle = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  width: 86px;
`;

export const FriendCardSpan = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
