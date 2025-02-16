import styled from 'styled-components';

export const CreateChatRoomContainer = styled.div`
  padding: 0 60px 78px;
`;

export const Header = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 50px;
`;

export const ThumbnailItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
`;

export const Caution = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
`;

export const InputItem = styled.li`
  margin-bottom: 44px;
`;

export const ImageLabel = styled.div`
  ${({ theme }) => theme.typo.T2_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 16px;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typo.T2_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 16px;
  display: inline-block;
`;

export const RequiredTag = styled.span`
  color: ${({ theme }) => theme.colors.Alter_error};
`;

export const CreateButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 108px;
`;
