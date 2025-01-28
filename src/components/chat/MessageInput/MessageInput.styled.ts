import styled from 'styled-components';

export const MessageInputForm = styled.form`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  border-radius: 20px;
  padding: 8px;
  padding-left: 16px;
  margin: 0 20px 40px;
`;

export const MessageInputLabel = styled.label`
  width: 100%;

  .message-input__textarea {
    ${({ theme }) => theme.typo.B1_R};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.Gray_100};
    border: none;
    outline: transparent;
    resize: none;
    padding: 0;
    line-height: 21px;
  }
`;

export const PhotoMessageLabel = styled.label`
  cursor: pointer;
  height: 32px;
`;

export const SendButton = styled.button`
  margin-left: 8px;
  height: 32px;

  &:disabled {
    cursor: not-allowed;
  }
`;
