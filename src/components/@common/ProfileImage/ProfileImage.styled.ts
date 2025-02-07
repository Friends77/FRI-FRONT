import styled from 'styled-components';

export const ProfileImg = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  font-size: 0;
  border: 1px solid ${({ theme }) => theme.colors.Gray_100};
  border-radius: 999px;
  object-fit: cover;
`;
