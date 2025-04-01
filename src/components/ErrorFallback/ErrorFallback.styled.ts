import { Link } from 'react-router';
import styled from 'styled-components';

export const ErrorFallbackContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

export const GoHomeButton = styled(Link)`
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typo.D1_R};
  margin-bottom: 30px;
`;

export const Reason = styled.p`
  ${({ theme }) => theme.typo.B1_B};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.Alter_error};
`;

export const Description = styled.p`
  margin-bottom: 10px;
  ${({ theme }) => theme.typo.B1_R};
  text-align: center;
`;

export const SendEmail = styled.a`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.Gray_900};
  text-decoration: underline;
`;
