import styled from 'styled-components';

export const Button = styled.button<{ $width?: string }>`
  ${({ theme }) => theme.typo.B1_R};
  padding: 1rem;
  width: ${({ $width }) => $width || '20rem'};
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  border-radius: 0.5rem;
  transition: color 0.3s ease;

  &:disabled {
    color: ${({ theme }) => theme.colors.Gray_800};
    background-color: ${({ theme }) => theme.colors.Gray_200};
    pointer-events: none;
  }
`;
