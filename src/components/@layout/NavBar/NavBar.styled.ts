import { NavLink } from 'react-router';
import styled, { css } from 'styled-components';

export const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  padding-top: 24px;
  width: 72px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Gray_200};
  z-index: 200;
`;

export const NavMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

export const NavMenu = styled.li`
  width: fit-content;
`;

const NavMenuContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const NavMenuLink = styled(NavLink)`
  ${NavMenuContentStyle}
`;

export const NavMenuIcon = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme, $isActive }) =>
    $isActive && theme.colors.Blue_600};
  border-radius: ${({ $isActive }) => $isActive && '999px'};
`;

export const NavMenuText = styled.p<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) => theme.typo[$isActive ? 'B2_B' : 'B2_R']}
  color: ${({ theme, $isActive }) =>
    theme.colors[$isActive ? 'Blue_600' : 'Gray_1000']}
`;

export const CollapseBtn = styled.button`
  ${NavMenuContentStyle}
`;
