import * as Styled from './ListWrapper.styled';
import { useState } from 'react';

interface IContentWrapperProps {
  children: React.ReactNode;
  isOpened?: boolean;
  title: string;
  count: number;
}

const ListWrapper = ({
  children,
  isOpened,
  title,
  count,
}: IContentWrapperProps) => {
  const [isOpen, setIsOpen] = useState(isOpened || false);

  const handleIsOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
};

export default ListWrapper;
