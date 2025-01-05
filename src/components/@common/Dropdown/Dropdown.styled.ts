import Select from 'react-select';
import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$width ? props.$width : '320px')};
`;

export const Label = styled.label<{ $isRequired?: boolean }>`
  align-self: flex-start;
  position: relative;
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 16px;

  &::after {
    display: ${({ $isRequired }) => ($isRequired ? 'inline' : 'none')};
    content: '*';
    position: absolute;
    right: -16px;
    color: ${({ theme }) => theme.colors.Alter_error};
  }
`;

export const Dropdown = styled(Select)<{
  $isMulti?: boolean;
  $isError: boolean;
}>`
  .dropdown__control {
    width: 100%;
    min-height: 56px;
    border-radius: 6px;
    border: 1px solid
      ${({ theme, $isError }) =>
        $isError ? theme.colors.Alter_error : theme.colors.Gray_500};
    cursor: pointer;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.Blue_400};
    }
  }

  .dropdown__control--is-focused {
    border: 1px solid ${({ theme }) => theme.colors.Blue_400};
    box-shadow: none;
  }

  .dropdown__value-container {
    justify-content: left;
    padding: 16px;
    ${({ theme }) => theme.typo.B1_R};
  }

  .dropdown__multi-value {
    background-color: ${({ theme }) => theme.colors.Gray_100};
    border: 1px solid ${({ theme }) => theme.colors.Gray_300};
    border-radius: 4px;
    padding: 4px 6px 4px 8px;
    gap: 4px;
  }

  .dropdown__multi-value__remove:hover {
    background-color: ${({ theme }) => theme.colors.Gray_100};
  }

  .dropdown__indicator-separator {
    display: none;
  }

  .dropdown__indicators {
    padding: 8px;
  }

  .dropdown__menu {
    width: 100%;
    color: ${({ theme }) => theme.colors.Gray_800};
    ${({ theme }) => theme.typo.B1_R};
    text-align: left;
  }

  .dropdown__menu-list::-webkit-scrollbar {
    width: 6px;
  }

  .dropdown__menu-list::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.Gray_400};
    border-radius: 6px;
  }

  .dropdown__option:hover {
    background-color: ${({ theme }) => theme.colors.Gray_100};
    color: ${({ theme }) => theme.colors.Gray_800};
  }

  .dropdown__option--is-focused,
  .dropdown__option--is-selected {
    background-color: ${({ theme }) => theme.colors.Gray_100};
    color: ${({ theme }) => theme.colors.Gray_800};
  }
`;

export const ErrorMsg = styled.p`
  ${({ theme }) => theme.typo.B2_R};
  transform: translateY(11px);
  text-align: start;
  color: ${({ theme }) => theme.colors.Alter_error};
`;
