import styled from 'styled-components';

export const Wrapper = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 72px;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Gray_100};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: 888;
`;

export const Header = styled.section`
  padding: 18px 24px 14px;
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
