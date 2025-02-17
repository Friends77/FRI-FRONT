import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 14px;
  padding: 0 24px;
`;

export const SideBarButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SideBarButton = styled.button`
  position: relative;
  display: flex;
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
