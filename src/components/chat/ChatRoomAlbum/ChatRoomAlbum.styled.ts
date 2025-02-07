import ArrowDown from '@/components/@common/SVG/Icon/ArrowDown';
import styled from 'styled-components';

interface IChatRoomAlbumProps {
  $isOpen: boolean;
}

export const ChatRoomAlbum = styled.div<IChatRoomAlbumProps>`
  z-index: 200;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.White};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(100%)'};
`;

export const Header = styled.div`
  padding: 11px 16px;
  display: flex;
  align-items: center;
`;

export const BackButton = styled.button`
  display: flex;
`;

export const BackIcon = styled(ArrowDown)`
  transform: rotate(90deg);
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.T2_B}
  flex: 1;
  text-align: center;
`;

export const AlbumContent = styled.ul`
  padding: 8px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const AlbumImageButton = styled.button`
  display: flex;
`;

export const AlbumImage = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 4px;
`;
