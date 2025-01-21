import styled from 'styled-components';

export const ProfileImg = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 999px;
  object-fit: cover;
`;
