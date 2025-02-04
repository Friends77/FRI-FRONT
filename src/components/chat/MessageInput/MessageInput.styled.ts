import styled from 'styled-components';

export const MessageInputFormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.White};
  padding: 16px 20px 40px;
`;

export const MessageInputForm = styled.form`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  border-radius: 20px;
  padding: 8px;
  padding-left: 16px;
`;

export const MessageInputLabel = styled.label`
  width: 100%;
`;

export const MessageInput = styled.textarea`
  ${({ theme }) => theme.typo.B1_R};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  border: none;
  outline: transparent;
  resize: none;
  padding: 0;
  line-height: 21px;
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
