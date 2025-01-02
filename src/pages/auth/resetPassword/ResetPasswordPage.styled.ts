import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
  margin-left: auto;
  margin-right: auto;
  width: 440px;
`;

export const Header = styled.h1`
  ${({ theme }) => theme.typo.D1_B}
  margin-bottom: 64px;
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
