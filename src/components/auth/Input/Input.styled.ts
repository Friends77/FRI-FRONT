import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${({ $width }) => $width || '320px'};
`;

export const Label = styled.label<{
  $bold: boolean;
  $isRequired: boolean;
  $color?: string;
}>`
  ${({ theme, $bold }) => ($bold ? theme.typo.T2_B : theme.typo.B1_B)};
  position: relative;
  align-self: flex-start;
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.Gray_800};

  &::after {
    display: ${({ $isRequired }) => ($isRequired ? 'inline' : 'none')};
    content: '*';
    position: absolute;
    right: -16px;
    color: ${({ theme }) => theme.colors.Alter_error};
  }
`;

export const InputContainer = styled.div<{ $isErrorMsgRelative?: boolean }>`
  position: relative;
  margin-bottom: ${({ $isErrorMsgRelative }) =>
    $isErrorMsgRelative ? '8px' : '40px'};
`;

export const Input = styled.input<{
  /** 입력란에 에러가 있는 경우 스타일 지정을 위함 */
  $isError?: boolean;
  /** 입력된 텍스트가 있는 경우 입력란의 padding을 적절하게 설정해주기 위함 */
  $text?: string;
}>`
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
  top: 18px;
  right: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
`;

export const ErrorMsg = styled.p<{ $isErrorMsgRelative?: boolean }>`
  ${({ theme }) => theme.typo.B2_R};
  position: ${({ $isErrorMsgRelative }) => !$isErrorMsgRelative && 'absolute'};
  transform: translateY(11px);
  text-align: start;
  color: ${({ theme }) => theme.colors.Alter_error};
`;
