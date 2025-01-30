import SecondaryButton from '@/components/@common/Button/SecondaryButton';
import styled from 'styled-components';

export const ProfilePageHeader = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ProfilePageInnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfilePageContentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 58px;
  gap: 48px;
`;

export const ProfilePageImageContainer = styled.article`
  display: flex;
  justify-content: center;
`;

export const ProfilePageInputContainer = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
`;

export const ProfilePageLabel = styled.label<{ $isRequired?: boolean }>`
  ${({ theme }) => theme.typo.T2_R};
  color: ${({ theme }) => theme.colors.Gray_1000};

  &::after {
    display: ${({ $isRequired }) => ($isRequired ? 'inline' : 'none')};
    content: '*';
    position: absolute;
    color: ${({ theme }) => theme.colors.Alter_error};
  }
`;

export const NickNameSection = styled.article`
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const UpdateNickNameBtn = styled(SecondaryButton)`
  height: 53px;
  cursor: pointer;
`;

export const ProfilePageMBTIOption = styled.article`
  display: flex;
  justify-content: space-between;
`;

export const ProfilePageRadio = styled.article`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 6px;
`;

export const ProfilePageButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 245px;
`;
