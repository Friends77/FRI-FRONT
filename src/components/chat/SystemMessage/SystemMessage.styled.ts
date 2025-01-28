import styled from 'styled-components';

export const SystemMessage = styled.li`
  ${({ theme }) => theme.typo.Label_R};
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.Gray_700};
  padding: 16px;
`;
