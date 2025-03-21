import SecondaryButton from '@/components/@common/Button/SecondaryButton';
import styled from 'styled-components';

export const ProfilePageHeader = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const ProfilePageStyledForm = styled.form`
  display: flex;
  justify-content: center;
`;

export const ProfilePageContentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 58px 0px 120px 0px;
  gap: 48px;
`;

export const ProfilePageImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfilePageInputContainer = styled.div`
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

export const ProfilePageBirthSection = styled.div`
  display: flex;
  gap: 8px;
`;

export const NickNameSection = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const UpdateNickNameBtn = styled(SecondaryButton)`
  height: 53px;
  cursor: pointer;
`;

export const ProfilePageMBTIOption = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfilePageRadio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 6px;
`;

export const ProfilePageButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 245px;
`;
