import styled, { css } from 'styled-components';

interface IUsersWrapper {
  $type: 'row' | 'column';
}

export const UsersWrapper = styled.div<IUsersWrapper>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-x: hidden;

  ${({ $type }) =>
    $type === 'row' &&
    css`
      width: 390px;
    `}
`;

export const UsersTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.typo.Gray_1000};
`;

export const UsersTitleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UsersTitle = styled.h3`
  ${({ theme }) => theme.typo.D2_B};
`;

export const UsersSubTitle = styled.h5`
  ${({ theme }) => theme.typo.T2_R};
`;

export const UsersButtonSection = styled.section`
  cursor: pointer;
`;

export const UsersRecommendSection = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
