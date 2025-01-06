import styled from 'styled-components';
import checkMarkSvg from '@/assets/icons/check-mark.svg';

export const Label = styled.label`
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

  &:checked {
    border-color: transparent;
    background-size: 120% 120%;
    background-position: 50%;
    background-image: url(${checkMarkSvg});
    background-color: ${({ theme }) => theme.colors.Blue_500};
  }
`;
