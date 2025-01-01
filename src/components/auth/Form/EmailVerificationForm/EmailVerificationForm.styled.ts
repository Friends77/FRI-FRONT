import SecondaryButton from '@/components/@common/Button/SecondaryButton';
import styled from 'styled-components';

export const SendCodeContent = styled.div`
  position: relative;
`;

export const SendCodeBtn = styled(SecondaryButton)`
  position: absolute;
  top: 47px;
  right: 0;
`;

export const CodeContent = styled.div`
  position: relative;
  padding-bottom: 20px;
`;

export const Time = styled.div<{ $text?: string }>`
  position: absolute;
  top: 34px;
  right: ${({ $text }) => ($text ? '36px' : '16px')};
`;
