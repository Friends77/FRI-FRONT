import styled from 'styled-components';

export const PreviewMessageContainer = styled.button`
  position: sticky;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0 20px;
`;

export const PreviewMessage = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 999px;
  padding: 0 16px;
`;
