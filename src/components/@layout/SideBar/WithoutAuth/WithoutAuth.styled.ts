import { Link } from 'react-router';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
  height: 100%;
`;

export const Text = styled.p`
  ${({ theme }) => theme.typo.T2_R};
  line-height: 28px;
`;

export const LoginBtn = styled(Link)`
  ${({ theme }) => theme.typo.B2_R};
  padding: 8px 20px;
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  border-radius: 999px;
`;
