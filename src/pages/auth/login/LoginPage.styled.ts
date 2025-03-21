import { Link } from 'react-router';
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
`;

export const LoginHeader = styled.h3`
  ${({ theme }) => theme.typo.D1_B}
  margin-bottom: 64px;
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const LoginOptions = styled.ul`
  display: flex;
  gap: 16px;
  margin-top: 47px;
  margin-bottom: 45px;
`;

export const LoginOption = styled(Link)`
  ${({ theme }) => theme.typo.B1_R};
  position: relative;
  color: ${({ theme }) => theme.colors.Gray_800};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -9px;
    width: 1px;
    height: 19px;
    transform: translateY(-50%);
    background-color: #333;
  }

  &:last-child::after {
    display: none;
  }
`;
