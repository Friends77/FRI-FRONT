import * as Styled from './Tag.styled';

export interface ITagProps {
  /** 태그 크기 (기본값: small) */
  size?: 'small' | 'large';
  /** 태그에 표시할 아이콘 (아이콘이 없으면 null로 설정) */
  icon: string | null;
  /** 태그에 표시할 텍스트 */
  label: string;
}

const Tag = ({ size = 'small', icon, label }: ITagProps) => {
  return (
    <Styled.Wrapper $size={size}>
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Styled.Wrapper>
  );
};

export default Tag;
