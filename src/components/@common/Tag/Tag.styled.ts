import styled from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 8px;
  padding: 4px 8px 4px 8px;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  color: ${({ theme }) => theme.colors.Gray_800};
  ${({ theme }) => theme.typo.Label_R};
  gap: 4px;
`;
