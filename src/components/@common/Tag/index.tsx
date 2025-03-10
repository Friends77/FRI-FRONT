import * as Styled from './Tag.styled';

export interface ITagProps {
  size?: 'small' | 'large';
  icon: string | null;
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
