/**
 * 채팅방 리스트 페이지 이동 컴포넌트
 * @author 선우
 */

import ArrowLeft from '@/components/@common/SVG/Icon/ArrowLeft';
import * as Styled from './PageNavigator.styled';
import ArrowRight from '@/components/@common/SVG/Icon/ArrowRight';

export interface IpageNavigatorProps {
  direction: 'prev' | 'next'; // 이동 방향
  disabled: boolean;
  onClick: () => void;
}

const PageNavigator = ({
  direction,
  disabled,
  onClick,
}: IpageNavigatorProps) => {
  return (
    <Styled.Wrapper onClick={onClick} disabled={disabled}>
      {direction === 'prev' ? (
        <ArrowLeft title="이전" width="6" height="12" />
      ) : (
        <ArrowRight title="다음" width="7" height="12" />
      )}
    </Styled.Wrapper>
  );
};

export default PageNavigator;
