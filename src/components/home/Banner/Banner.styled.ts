import Banner from '@/assets/images/banner.png';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  width: 100%;
  border-radius: 16px;
  padding: 32px 32px;
  background:
    linear-gradient(90deg, #191919 0.33%, rgba(25, 25, 25, 0) 101.51%),
    url(${Banner}) center / cover no-repeat border-box;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 45px;
  height: 24px;
  padding: 4px 10px;
  border-radius: 21px;
  border: 2px solid ${({ theme }) => theme.colors.Alter_error};
  ${({ theme }) => theme.typo.Label_B};
  color: ${({ theme }) => theme.colors.Alter_error};
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SubTitle = styled.p`
  ${({ theme }) => theme.typo.B2_R};
  color: ${({ theme }) => theme.colors.Gray_600};
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatRoomInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChatRoomImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 26px;
`;

export const ChatRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.typo.B1_R};
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  width: 145px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.Blue_500};
  color: ${({ theme }) => theme.colors.Gray_100};
  ${({ theme }) => theme.typo.B2_B};
  margin-top: 10px;
`;
