import styled from 'styled-components';

export const Wrapper = styled.button<{ $isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Blue_50};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
`;
