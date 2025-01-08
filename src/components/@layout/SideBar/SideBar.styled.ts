import styled from 'styled-components';

export const Wrapper = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 72px;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.White};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  z-index: 888;
`;
