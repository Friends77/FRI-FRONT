import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 14px;
`;

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 999px;
`;

export const Nickname = styled.p`
  ${({ theme }) => theme.typo.T1_B}
  color: ${({ theme }) => theme.colors.Gray_1000}
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
