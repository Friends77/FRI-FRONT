import styled from 'styled-components';

export const SystemMessage = styled.li`
  ${({ theme }) => theme.typo.Label_R};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.Gray_700};
  padding: 16px;

  &::before,
  &::after {
    content: '';
    width: 26px;
    height: 0.5px;
    background-color: ${({ theme }) => theme.colors.Gray_700};
  }

  &::before {
    margin-right: 8px;
  }

  &::after {
    margin-left: 8px;
  }
`;
