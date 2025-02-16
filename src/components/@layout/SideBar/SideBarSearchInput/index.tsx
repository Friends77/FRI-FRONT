import Search from '@/components/@common/SVG/Icon/Search';
import * as Styled from './SideBarSearchInput.styled';
import { useFormContext } from 'react-hook-form';

interface ISideBarSearchInput {
  className?: string;
  placeholder?: string;
}

const SideBarSearchInput = ({
  className,
  placeholder,
}: ISideBarSearchInput) => {
  const { register } = useFormContext();

  return (
    <Styled.Wrapper className={className}>
      <Styled.InputContainer>
        <Styled.Input
          placeholder={placeholder || '검색'}
          {...register('keyword')}
        />
        <Styled.SearchBtn>
          <Search title="검색" width="24px" height="24px" />
        </Styled.SearchBtn>
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default SideBarSearchInput;
