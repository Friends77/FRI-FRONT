import styled from 'styled-components';

export interface ITag {
  $size: 'small' | 'large';
}

export const Wrapper = styled.li<ITag>`
  display: inline-flex;
  outline: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  color: ${({ theme }) => theme.colors.Gray_800};
  gap: 4px;
  padding: 4px 6px;

  span {
    ${({ theme, $size }) =>
      $size === 'small' ? theme.typo.Label_R : theme.typo.B2_R};
  }
`;
