import Search from '@/components/@common/SVG/Icon/Search';
import * as Styled from './SearchInput.styled';
import { useFormContext } from 'react-hook-form';
import Cancel from '@/components/@common/SVG/Icon/Cancel';

interface ISearchInput {
  className?: string;
  placeholder?: string;
}

const SearchInput = ({ className, placeholder }: ISearchInput) => {
  const { register, watch, setValue } = useFormContext();

  const keyword = watch('keyword');

  const handleDeleteKeyword = () => {
    setValue('keyword', '');
  };

  return (
    <Styled.Wrapper className={className}>
      <Styled.InputContainer>
        <Styled.Input
          placeholder={placeholder || '검색'}
          {...register('keyword')}
        />

        {keyword && (
          <Styled.DeleteKeywordButton
            type="button"
            onClick={handleDeleteKeyword}
          >
            <Cancel title="검색어 삭제" width="20" height="20" />
          </Styled.DeleteKeywordButton>
        )}
        <Styled.SearchButton type="button">
          <Search title="검색" width="24px" height="24px" />
        </Styled.SearchButton>
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default SearchInput;
