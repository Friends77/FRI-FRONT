import styled from 'styled-components';

export const SocialLoginFormHeader = styled.h3`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.Gray_800};
  ${({ theme }) => theme.typo.B1_B};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.Gray_400};
  }

  &::before {
    margin-right: 1em;
  }

  &::after {
    margin-left: 1em;
  }
`;

export const SocialLoginFormContent = styled.ul`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 37px;
`;
