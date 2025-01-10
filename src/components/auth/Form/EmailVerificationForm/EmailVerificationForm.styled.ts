import SecondaryButton from '@/components/@common/Button/SecondaryButton';
import styled from 'styled-components';

export const SendCodeContent = styled.div`
  position: relative;
`;

export const SendCodeBtn = styled(SecondaryButton)`
  position: absolute;
  top: 46px;
  right: 0;
`;

export const CodeContent = styled.div`
  position: relative;
`;

export const Time = styled.div<{
  /** 입력란에 입력된 값이 있는 경우 생기는 취소(x) 버튼을 고려하여 위치를 지정하기 위함 */
  $text?: string;
}>`
  position: absolute;
  top: 16.5px;
  right: ${({ $text }) => ($text ? '36px' : '16px')};
`;
