import styled from 'styled-components';

export const AlarmItem = styled.li`
  padding: 16px 20px;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Blue_50};
  }
`;

export const Time = styled.time`
  display: block;
  ${({ theme }) => theme.typo.Label_R}
  color: ${({ theme }) => theme.colors.Gray_600};
  text-align: right;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ShowProfileButton = styled.button`
  display: flex;
`;

export const Content = styled.p`
  ${({ theme }) => theme.typo.B1_B}
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

export const Nickname = styled.span`
  display: inline-block;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RejectButton = styled.button`
  display: flex;
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
  background-color: ${({ theme }) => theme.colors.Gray_200};
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 21px;
`;

export const AcceptButton = styled.button`
  display: flex;
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_500};
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 21px;
`;
