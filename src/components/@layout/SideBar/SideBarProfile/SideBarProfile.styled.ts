import styled from 'styled-components';

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Nickname = styled.p`
  ${({ theme }) => theme.typo.T1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;
