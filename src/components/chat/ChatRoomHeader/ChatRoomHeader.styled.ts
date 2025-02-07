import styled from 'styled-components';

export const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  height: 82px;
  background-color: ${({ theme }) => theme.colors.White};
`;

export const Header = styled.h3`
  ${({ theme }) => theme.typo.H1_B};
`;

export const MoreButton = styled.button`
  display: flex;
`;
