import ArrowLeft from '@/components/@common/SVG/Icon/ArrowLeft';
import * as Styled from './PageNavigator.styled';
import ArrowRight from '@/components/@common/SVG/Icon/ArrowRight';
import { Theme } from '@/styles/theme';

export interface IpageNavigatorProps {
  /** 아이콘 색상 (기본값: blue) */
  color?: 'blue' | 'gray';
  /** 이전(‘prev’) 또는 다음(‘next’) 방향 설정 */
  direction: 'prev' | 'next';
  /** 버튼 비활성화 여부 */
  disabled: boolean;
  /** 버튼 클릭 시 실행되는 함수 */
  onClick: () => void;
}

const PageNavigator = ({
  color = 'blue',
  direction,
  disabled,
  onClick,
}: IpageNavigatorProps) => {
  return (
    <Styled.Wrapper onClick={onClick} disabled={disabled} $color={color}>
      {direction === 'prev' ? (
        <ArrowLeft
          title="이전"
          width="6"
          height="12"
          color={
            color === 'blue' ? Theme.colors.Blue_500 : Theme.colors.Gray_1000
          }
        />
      ) : (
        <ArrowRight
          title="다음"
          width="7"
          height="12"
          color={
            color === 'blue' ? Theme.colors.Blue_500 : Theme.colors.Gray_1000
          }
        />
      )}
    </Styled.Wrapper>
  );
};

export default PageNavigator;
