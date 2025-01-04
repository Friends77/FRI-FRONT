import styled from 'styled-components';

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthFormHeaderSection = styled.section`
  margin-top: 120px;
  ${({ theme }) => theme.typo.D1_B}
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const AuthFormContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 66px;
`;

export const AuthFormEmailSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const AuthFormCertNoInputSection = styled.section`
  position: relative;
`;

export const AuthFormInputWithBtn = styled.section`
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: space-between;
`;

export const AuthFormButtonContainer = styled.section`
  position: absolute;
  top: 45px;
  right: 0;
`;

export const AuthFormPWSection = styled.section``;

export const AuthFormButtonSection = styled.section``;

export const Time = styled.div<{
  /** 입력란에 입력된 값이 있는 경우 생기는 취소(x) 버튼을 고려하여 위치를 지정하기 위함 */
  $text?: string;
}>`
  position: absolute;
  top: 18px;
  right: ${({ $text }) => ($text ? '36px' : '16px')};
`;
