import styled from 'styled-components';

export interface ITag {
  $size: 'small' | 'large';
}

export const Wrapper = styled.span<ITag>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  outline: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  color: ${({ theme }) => theme.colors.Gray_800};
  padding: 4px 6px;
  max-width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    ${({ theme, $size }) =>
      $size === 'small' ? theme.typo.Label_R : theme.typo.B2_R};
  }
`;
