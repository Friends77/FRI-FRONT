import styled from 'styled-components';

export const UserCardWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray_200};
    border-radius: 16px;
  }
`;

export const UserCardIntroSection = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const UserCardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 999px;
`;

export const UserCardInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const UserCardNickname = styled.span`
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const UserCardDescription = styled.span<{ $isHovered: boolean }>`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ $isHovered }) => ($isHovered ? 'ellipsis' : '')};
  width: ${({ $isHovered }) => ($isHovered ? '55%' : '100%')};
`;

export const UserCardButton = styled.button`
  position: absolute;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Blue_50};
  background-color: ${({ theme }) => theme.colors.Blue_400};
  border-radius: 8px;
  padding: 6px 6px 6px 4px;
  gap: 4px;
`;
