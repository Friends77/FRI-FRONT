import Search from '@/components/@common/SVG/Icon/Search';
import * as Styled from './SideBarSearchInput.styled';

const SideBarSearchInput = () => {
  return (
    <Styled.Wrapper>
      <Styled.InputContainer>
        <Styled.Input placeholder="검색" />
        <Styled.SearchBtn>
          <Search title="검색" width="24px" height="24px" />
        </Styled.SearchBtn>
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default SideBarSearchInput;
