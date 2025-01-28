import styled from 'styled-components';

interface IOtherMessageItemProps {
  $isSameTime: boolean;
  $isSameSender: boolean;
}

export const OtherMessageItem = styled.li<IOtherMessageItemProps>`
  display: flex;
  align-items: flex-end;
  padding: ${({ $isSameTime, $isSameSender }) =>
    $isSameTime && $isSameSender ? '8px 24px 0' : '16px 24px 0'};
`;

export const MessageContent = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  max-width: 80%;
  background-color: ${({ theme }) => theme.colors.Gray_300};
  padding: 6px 12px;
  border-radius: 0 12px 12px 12px;
  word-break: break-word;
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
