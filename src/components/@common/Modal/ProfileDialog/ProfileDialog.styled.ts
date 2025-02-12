import styled from 'styled-components';

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.h3`
  ${({ theme }) => theme.typo.T2_B};
`;

export const Description = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const InfoTable = styled.div`
  background-color: ${({ theme }) => theme.colors.Gray_100};
  margin-bottom: 12px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoLabel = styled.span`
  ${({ theme }) => theme.typo.B2_R};
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.Gray_800};
`;

export const InfoValue = styled.span`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
  flex: 1;
  text-align: center;
`;

export const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
