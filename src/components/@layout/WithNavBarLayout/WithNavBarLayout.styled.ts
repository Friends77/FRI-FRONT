import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Content = styled.div<{ $isSideBarOpen: boolean }>`
  flex-grow: 1;
  max-width: ${({ $isSideBarOpen }) =>
    $isSideBarOpen ? 'calc(100% - 472px)' : 'calc(100% - 72px)'};
  margin-left: ${({ $isSideBarOpen }) => ($isSideBarOpen ? '472px' : '72px')};
  transition: margin-left 0.3s ease;
`;
