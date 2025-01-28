import styled from 'styled-components';

export const DateMessage = styled.li`
  ${({ theme }) => theme.typo.Label_R};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.Gray_700};
  padding: 16px 16px 0;

  &::before,
  &::after {
    content: '';
    width: 100%;
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
