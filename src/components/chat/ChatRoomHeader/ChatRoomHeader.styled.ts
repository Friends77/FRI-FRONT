import styled from 'styled-components';

export const ChatRoomHeader = styled.h3`
  ${({ theme }) => theme.typo.H1_B};
  display: flex;
  align-items: center;
  margin-left: 24px;
  width: 100%;
  height: 82px;
  background-color: ${({ theme }) => theme.colors.White};
`;
