import * as Styled from './SideBarListWrapper.styled';
import { useState } from 'react';

interface ISideBarContentWrapperProps {
  children: React.ReactNode;
  isOpened?: boolean;
  title: string;
  count: number;
}

const SideBarListWrapper = ({
  children,
  isOpened,
  title,
  count,
}: ISideBarContentWrapperProps) => {
  const [isOpen, setIsOpen] = useState(isOpened || false);

  const handleIsOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Styled.Wrapper $isOpen={isOpen}>
      <Styled.Title $isOpen={isOpen}>
        <Styled.Text $isOpen={isOpen}>{`${title} ${count}`}</Styled.Text>
        <Styled.MoreBtn onClick={handleIsOpenToggle}>
          <Styled.MoreIcon
            title={`${title} 목록 토글 버튼`}
            width="30"
            height="30"
            $isOpen={isOpen}
          />
        </Styled.MoreBtn>
      </Styled.Title>
      {isOpen && <Styled.List>{children}</Styled.List>}
    </Styled.Wrapper>
  );
};

export default SideBarListWrapper;
