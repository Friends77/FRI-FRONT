import styled from 'styled-components';

export const EmptyText = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;
