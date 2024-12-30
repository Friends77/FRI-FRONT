import styled from 'styled-components';
import checkMarkSvg from '@/assets/icons/check-mark.svg';

export const Label = styled.label`
  ${({ theme }) => theme.typo.T2_R}
  color: ${({ theme }) => theme.colors.Gray_900};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Radio = styled.input`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.Gray_1000};
  border-radius: 50%;
  width: 18px;
  height: 18px;

  &:checked {
    border-color: transparent;
    background-position: 50%;
    background-image: url(${checkMarkSvg});
    background-color: ${({ theme }) => theme.colors.Blue_500};
  }
`;
