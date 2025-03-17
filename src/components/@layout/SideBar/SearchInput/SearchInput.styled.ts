import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 16px;
  padding: 0 24px;
`;

export const InputContainer = styled.div`
  position: relative;
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

export const DeleteKeywordButton = styled.button`
  position: absolute;
  display: flex;
  top: 50%;
  right: 48px;
  transform: translateY(-50%);
`;

export const SearchButton = styled.button`
  position: absolute;
  display: flex;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
`;
