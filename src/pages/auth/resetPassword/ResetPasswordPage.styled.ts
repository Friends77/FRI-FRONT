import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 440px;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 110px;
`;

export const Header = styled.h3`
  ${({ theme }) => theme.typo.D1_B}
  margin-bottom: 64px;
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
