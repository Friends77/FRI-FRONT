import styled from 'styled-components';

export const Button = styled.button<{ $width?: string }>`
  ${({ theme }) => theme.typo.B1_B};
  padding: 15px;
  width: ${({ $width }) => $width || '320px'};
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  border-radius: 8px;
  transition: color 0.3s ease;

  &:disabled {
    ${({ theme }) => theme.typo.B1_R};
    color: ${({ theme }) => theme.colors.Gray_800};
    background-color: ${({ theme }) => theme.colors.Gray_200};
    pointer-events: none;
  }
`;
