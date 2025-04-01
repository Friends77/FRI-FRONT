import styled from 'styled-components';

interface ITag {
  $color: 'blue' | 'gray';
}

export const Wrapper = styled.button<ITag>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: ${({ theme, $color }) =>
    $color === 'blue' ? theme.colors.Blue_50 : theme.colors.Gray_200};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
