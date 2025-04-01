import { useState } from 'react';

const useChatRoomDrawer = (imageMessages: string[]) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isOpenAlbum, setIsOpenAlbum] = useState(false);

  const [isShowImageViewer, setIsShowImageViewer] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onMoreButtonClick = () => {
    setIsOpenDrawer((prevState) => !prevState);
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const onOpenAlbum = () => {
    setIsOpenAlbum(true);
  };

  const onCloseAlbum = () => {
    setIsOpenAlbum(false);
  };

  const onImageViewerClose = () => {
    setIsShowImageViewer(false);
  };

  const onAlbumImageClick = (path: string) => {
    const index = imageMessages.findIndex((imagePath) => imagePath === path);
    setSelectedIndex(index);
    setIsShowImageViewer(true);
  };

  return {
    isOpenDrawer,
    isOpenAlbum,
    isShowImageViewer,
    selectedIndex,
    onMoreButtonClick,
    onCloseDrawer,
    onOpenAlbum,
    onCloseAlbum,
    onImageViewerClose,
    onAlbumImageClick,
  };
};

export default useChatRoomDrawer;
