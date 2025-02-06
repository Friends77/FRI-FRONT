import Select from 'react-select';
import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width};
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
    display: flex;
    justify-content: left;
    padding: 16px;
    ${({ theme }) => theme.typo.B1_R};
    gap: 10px;
  }

  .dropdown__multi-value {
    display: flex;
    background-color: ${({ theme }) => theme.colors.Gray_100};
    border: 1px solid ${({ theme }) => theme.colors.Gray_300};
    border-radius: 4px;
    padding: 4px 6px 4px 8px;
    gap: 4px;
    margin: 0px;
    align-items: center;
  }

  .dropdown__multi-value__label {
    padding: 0px;
    ${({ theme }) => theme.typo.B1_R};
    line-height: 21px;
    color: ${({ theme }) => theme.colors.Gray_800};
  }

  .dropdown__multi-value__remove {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
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
