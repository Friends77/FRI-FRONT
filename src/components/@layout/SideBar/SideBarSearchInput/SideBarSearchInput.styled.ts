import styled from 'styled-components';

export const Wrapper = styled.form`
  position: relative;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  ${({ theme }) => theme.typo.B1_R}
  padding: 0 40px 0 24px;
  width: 100%;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 999px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray_600};
  }
`;

export const SearchBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;
