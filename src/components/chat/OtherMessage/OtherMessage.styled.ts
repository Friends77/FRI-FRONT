import styled from 'styled-components';

interface IOtherMessageItemProps {
  $isSameTime: boolean;
  $isSameSender: boolean;
}

export const OtherMessageItem = styled.li<IOtherMessageItemProps>`
  display: flex;
  gap: 6px;
  padding: ${({ $isSameTime, $isSameSender }) =>
    $isSameTime && $isSameSender ? '8px 24px 0' : '16px 24px 0'};
`;

export const SenderProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileButton = styled.button`
  display: flex;
`;

export const SenderNickname = styled.div`
  ${({ theme }) => theme.typo.B1_B};
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const MessageContent = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  max-width: 80%;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  padding: 8px 12px;
  border-radius: 0 12px 12px 12px;
  word-break: break-word;
`;

export const ImageMessageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ImageMessageButton = styled.button`
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
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.Gray_600};
`;
