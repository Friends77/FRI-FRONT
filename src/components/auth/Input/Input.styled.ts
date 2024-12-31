import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${({ $width }) => $width || '20rem'};
`;

export const Label = styled.label<{ $bold: boolean; $isMandatory: boolean }>`
  ${({ theme, $bold }) => ($bold ? theme.typo.T2_B : theme.typo.B1_B)};
  position: relative;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.Gray_800};

  &::after {
    display: ${({ $isMandatory }) => ($isMandatory ? 'inline' : 'none')};
    content: '*';
    position: absolute;
    right: -16px;
    color: ${({ theme }) => theme.colors.Alter_error};
  }
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

export const Input = styled.input<{ $isError?: boolean }>`
  ${({ theme }) => theme.typo.B1_R};
  padding: 1rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.Gray_1000};
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.Alter_error : theme.colors.Gray_400};
  border-radius: 6px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: ${({ theme, $isError }) =>
      $isError ? theme.colors.Alter_error : theme.colors.Blue_400};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray_800};
  }
`;

export const CancelBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  margin: auto;
  padding: 0;
  width: 1.25rem;
  height: 1.25rem;
  border: none;
  background-color: transparent;
`;

export const ErrorMsg = styled.p`
  ${({ theme }) => theme.typo.B2_R};
  position: absolute;
  transform: translateY(11px);
  text-align: start;
  color: ${({ theme }) => theme.colors.Alter_error};
`;
