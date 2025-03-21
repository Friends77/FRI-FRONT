import styled from 'styled-components';

interface IMyMessageItemProps {
  $isSameTime: boolean;
  $isSameSender: boolean;
}

export const MyMessageItem = styled.li<IMyMessageItemProps>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: ${({ $isSameTime, $isSameSender }) =>
    $isSameTime && $isSameSender ? '8px 24px 0' : '16px 24px 0'};
`;

export const MessageContent = styled.p`
  max-width: 80%;
  ${({ theme }) => theme.typo.B1_R};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  color: ${({ theme }) => theme.colors.White};
  padding: 8px 12px;
  border-radius: 12px 0 12px 12px;
  word-break: break-word;
`;

export const ImageMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ImageMessageButton = styled.button`
  position: relative;
  display: flex;
`;

export const DimmedImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.Black};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.typo.B1_B};
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageMessageContent = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

export const SendTime = styled.span`
  ${({ theme }) => theme.typo.Label_R};
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.Gray_600};
`;

export const LoadingMessage = styled.p`
  ${({ theme }) => theme.typo.Label_R};
  display: flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.Gray_600};
  margin-right: 8px;
`;

export const FailedButtonContainer = styled.div`
  margin-right: 8px;
`;
