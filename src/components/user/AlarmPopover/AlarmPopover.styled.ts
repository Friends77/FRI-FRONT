import AlarmTriangle from '@/components/@common/SVG/Icon/AlarmTriangle';
import styled from 'styled-components';

export const AlarmPopoverContainer = styled.div`
  position: absolute;
  top: 64px;
  left: -2px;
  background-color: ${({ theme }) => theme.colors.White};
  width: 428px;
  min-height: 548px;
  border-radius: 12px;
  z-index: 100;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const AlarmTriangleIcon = styled(AlarmTriangle)`
  position: absolute;
  top: -20px;
  left: 43px;
`;

export const Header = styled.h3`
  ${({ theme }) => theme.typo.T2_R}
  color: ${({ theme }) => theme.colors.Gray_1000};
  padding: 16px 20px;
  text-align: left;
`;

export const AlarmList = styled.ul``;

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

export const EmptyText = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_700};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 62px;
`;
