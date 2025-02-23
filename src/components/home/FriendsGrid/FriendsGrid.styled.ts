import styled from 'styled-components';

export const FriendsGridWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 424.67px;
  border-radius: 24px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.Gray_200};
`;

export const FriendsGrid = styled.ul`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(4, 86px);
  grid-gap: 12px;
  width: 376px;
`;
