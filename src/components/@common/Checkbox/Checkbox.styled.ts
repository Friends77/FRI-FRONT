import styled from 'styled-components';
import Check from '../SVG/Icon/Check';

export const Label = styled.label`
  position: relative;
  ${({ theme }) => theme.typo.T2_R}
  color: ${({ theme }) => theme.colors.Gray_900};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const CheckBox = styled.input`
  appearance: none;
  border: 1.8px solid ${({ theme }) => theme.colors.Gray_700};
  border-radius: 2px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.Blue_500};
  }
`;

export const CheckMark = styled(Check)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(27%, 44%);
`;
