import styled from 'styled-components';

export const CustomModalContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CustomModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 424px;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
`;

export const Heading = styled.h3`
  ${({ theme }) => theme.typo.T1_B};
`;

export const CloseButton = styled.button`
  display: flex;
`;

export const Content = styled.div`
  margin-top: 16px;
`;
