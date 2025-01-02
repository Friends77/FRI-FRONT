import { Link } from 'react-router';
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

export const LoginHeader = styled.h1`
  ${({ theme }) => theme.typo.T1_B}
  margin-bottom: 64px;
  color: ${({ theme }) => theme.colors.Gray_1000};
  font-size: 30px;
  line-height: 38px;
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
  line-height: 20px;

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
