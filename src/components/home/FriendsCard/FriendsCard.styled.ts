import styled from 'styled-components';

export const FriendsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 24px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.Gray_200};
  width: 330px;
`;

export const FriendsCard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
