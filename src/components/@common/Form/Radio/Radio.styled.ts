import styled from 'styled-components';
import Check from '../../SVG/Icon/Check';

export const Label = styled.label`
  position: relative;
  ${({ theme }) => theme.typo.T2_R}
  color: ${({ theme }) => theme.colors.Gray_900};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Radio = styled.input`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.Gray_1000};
  border-radius: 50%;
  width: 18px;
  height: 18px;
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
  transform: translate(38%, 54%);
`;
