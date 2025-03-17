import styled from 'styled-components';

export const ProfileContent = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Nickname = styled.div`
  ${({ theme }) => theme.typo.T1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const MyMenu = styled.ul`
  position: absolute;
  top: 68px;
  left: 88px;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 6px;
  z-index: 300;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

export const MyPage = styled.li`
  padding: 8px 12px;
`;

export const MyPageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
`;

export const Logout = styled.li`
  padding: 8px 12px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
`;
