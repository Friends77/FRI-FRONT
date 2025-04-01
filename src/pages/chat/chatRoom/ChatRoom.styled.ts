import styled, { css } from 'styled-components';

interface IChatRoomContainerProps {
  $isOpenDrawer: boolean;
}

export const ChatRoom = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ChatRoomContainer = styled.div<IChatRoomContainerProps>`
  flex-grow: 1;
  ${({ $isOpenDrawer }) =>
    $isOpenDrawer &&
    css`
      margin-right: 400px;
    `}
  transition: margin-right 0.3s ease;
`;

export const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;
