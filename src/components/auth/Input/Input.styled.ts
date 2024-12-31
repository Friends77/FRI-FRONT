import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${({ $width }) => $width || '320px'};
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
  margin-bottom: 40px;
`;

export const Input = styled.input<{ $isError?: boolean; $text?: string }>`
  ${({ theme }) => theme.typo.B1_R};
  padding: ${({ $text }) => ($text ? '16px 36px 16px 16px' : '16px')};
  width: 100%;
  color: ${({ theme }) => theme.colors.Gray_1000};
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.Alter_error : theme.colors.Gray_400};
  border-radius: 6px;
  outline: none;
  line-height: 21px;
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
  right: 16px;
  margin: auto;
  padding: 0;
  width: 20px;
  height: 20px;
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
