import ArrowDown from '@/components/@common/SVG/Icon/ArrowDown';
import styled from 'styled-components';

export const PreviewMessageContainer = styled.button`
  position: sticky;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0 20px;
`;

export const PreviewMessage = styled.p`
  width: 100%;
  ${({ theme }) => theme.typo.B1_R};
  display: flex;
  align-items: center;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 999px;
  padding: 0 16px;
`;

export const MemberProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 16px;
`;

export const MemberName = styled.span`
  ${({ theme }) => theme.typo.B1_R};
`;

export const PreviewMessageContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`;

export const Content = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const ArrowDownIcon = styled(ArrowDown)`
  min-width: 24px;
`;
