import styled from 'styled-components';

export const Button = styled.button<{ $width?: string }>`
  ${({ theme }) => theme.typo.B2_B};
  padding: 16.5px;
  width: ${({ $width }) => $width || '102px'};
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  border-radius: 5px;
  transition: color 0.3s ease;

  &:disabled {
    color: ${({ theme }) => theme.colors.Gray_700};
    background-color: ${({ theme }) => theme.colors.Gray_400};
    pointer-events: none;
  }
`;
