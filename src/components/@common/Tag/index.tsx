/**
 * 태그 컴포넌트
 * @author 선우
 */

import * as Styled from './Tag.styled';

export interface ITagProps {
  icon: string | null;
  label: string;
}

const Tag = ({ icon, label }: ITagProps) => {
  return (
    <Styled.Wrapper>
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Styled.Wrapper>
  );
};

export default Tag;
