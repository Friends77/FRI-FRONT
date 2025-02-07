/**
 *  @SVG
 *    @사용목적
 *      1) SVG 아이콘을 일관되게 관리하고 재사용하기 위한 공통 컴포넌트
 *      2) SVG 아이콘의 속성(크기, 색상, 굵기 등)을 표준화하여 사용
 *    @주요기능
 *      1) SVG 아이콘의 크기, 색상, 굵기 등의 속성을 표준화하여 관리하고 접근성을 위한 title 속성을 제공하는 기능을 수행
 */

export interface ISVG extends React.SVGProps<SVGSVGElement> {
  /** 아이콘 title */
  title: string;
  /** 아이콘 가로 */
  width?: string;
  /** 아이콘 높이 */
  height?: string;
  /** 아이콘 색 */
  color?: string;
  /** 아이콘 서브색 */
  subColor?: string;
  /** 아이콘 굵기 */
  weight?: 1 | 1.1 | 1.6 | 2 | 2.5;
}

const SVG = ({
  width = '30',
  height = '30',
  title,
  children,
  ...rest
}: ISVG) => {
  return (
    <svg width={width} height={height} {...rest}>
      <title>{title}</title>
      {children}
    </svg>
  );
};

export default SVG;
