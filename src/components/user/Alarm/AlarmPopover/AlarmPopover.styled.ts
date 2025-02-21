import AlarmTriangle from '@/components/@common/SVG/Icon/AlarmTriangle';
import styled from 'styled-components';

export const AlarmPopoverContainer = styled.div`
  position: absolute;
  top: 64px;
  left: -2px;
  background-color: ${({ theme }) => theme.colors.White};
  width: 428px;
  height: 548px;
  border-radius: 12px;
  z-index: 200;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 548px;
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

export const AlarmList = styled.ul`
  flex: 1;
  overflow-y: auto;
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
