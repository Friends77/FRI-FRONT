import styled from 'styled-components';
import PrimaryButton from '../../Button/PrimaryButton';

export const ConfirmModalContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ConfirmModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 424px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Heading = styled.h3`
  ${({ theme }) => theme.typo.T1_B};
`;

export const CloseButton = styled.button`
  display: flex;
`;

export const Content = styled.div`
  margin-top: 16px;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typo.B1_R};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

export const CancelButton = styled(PrimaryButton)`
  ${({ theme }) => theme.typo.B1_R};
  background-color: ${({ theme }) => theme.colors.Gray_300};
  color: ${({ theme }) => theme.colors.Gray_800};
`;
