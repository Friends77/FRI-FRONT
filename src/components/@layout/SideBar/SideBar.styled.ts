import styled from 'styled-components';

export const Wrapper = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 72px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: 888;
`;
