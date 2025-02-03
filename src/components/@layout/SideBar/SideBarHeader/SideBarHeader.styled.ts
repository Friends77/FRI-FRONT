import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 14px;
  padding: 0 24px;
`;

export const NotificationBtn = styled.button`
  position: relative;
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 9px;
  height: 9px;
  background-color: ${({ theme }) => theme.colors.Alter_error};
  border-radius: 999px;
`;
