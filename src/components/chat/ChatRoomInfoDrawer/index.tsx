import { useRecoilValue } from 'recoil';
import * as Styled from './ChatRoomInfoDrawer.styled';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { imageMessagesSelector } from '@/recoil/chat/message';
import { CHAT_CONSTANT } from '@/constants/chat';
import chatMembersAtom from '@/recoil/chat/member';
import Exit from '@/components/@common/SVG/Icon/Exit';
import Close from '@/components/@common/SVG/Icon/Close';
import { useState } from 'react';
import ConfirmModal from '@/components/@common/Modal/ConfirmModal';
import useExitChatRoom from '@/hooks/chat/useExitChatRoom';
import { useParams } from 'react-router';

interface IChatRoomInfoDrawer {
  isOpen: boolean;
  onCloseDrawer: () => void;
  onOpenAlbum: () => void;
  onAlbumImageClick: (path: string) => void;
}

const ChatRoomInfoDrawer = ({
  isOpen,
  onCloseDrawer,
  onOpenAlbum,
  onAlbumImageClick,
}: IChatRoomInfoDrawer) => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const chatRoomDetail = useRecoilValue(roomDetailAtom);
  const imageMessages = useRecoilValue(imageMessagesSelector);
  const chatMemberList = useRecoilValue(chatMembersAtom);

  const [isOpenExitModal, setIsOpenExitModal] = useState(false);

  const { mutate: exitChatRoom } = useExitChatRoom();

  const handleOpenExitModal = () => {
    setIsOpenExitModal(true);
  };

  const handleExitChatRoom = () => {
    exitChatRoom(roomId);
  };

  const handleCancelExitChat = () => {
    setIsOpenExitModal(false);
  };

  return (
    <>
      {isOpenExitModal && (
        <ConfirmModal
          title={`${chatRoomDetail?.title}을 나가시겠습니까?`}
          onCancel={handleCancelExitChat}
          onConfirm={handleExitChatRoom}
          description="채팅방을 나가면 더 이상 메시지를 받을 수 없습니다."
        />
      )}

      <Styled.ChatRoomInfoDrawerContainer $isOpen={isOpen}>
        <Styled.CloseButtonContainer>
          <Styled.CloseButton onClick={onCloseDrawer}>
            <Close title="닫기" width="32" height="32" />
          </Styled.CloseButton>
        </Styled.CloseButtonContainer>
        <Styled.ThumbnailImage
          src={chatRoomDetail?.imageUrl}
          alt="채팅방 썸네일 이미지"
        />
        <Styled.Categories>
          {/* TODO: 카테고리 칩 머지되면 추가 */}
          카테고리들
        </Styled.Categories>
        <Styled.Album>
          <Styled.AlbumHeader>
            사진
            <Styled.MoreIconButton type="button" onClick={onOpenAlbum}>
              <Styled.MoreIcon title="사진 더보기" width="24" height="24" />
            </Styled.MoreIconButton>
          </Styled.AlbumHeader>
          {imageMessages.length > 0 && (
            <Styled.AlbumContent>
              {imageMessages
                .slice(-CHAT_CONSTANT.MAX_VISIBLE_ALBUM_IMAGES)
                .map((path) => (
                  <li key={path}>
                    <Styled.AlbumImageButton
                      onClick={() => onAlbumImageClick(path)}
                    >
                      <Styled.AlbumImage src={path} alt="사진" />
                    </Styled.AlbumImageButton>
                  </li>
                ))}
            </Styled.AlbumContent>
          )}
        </Styled.Album>
        <Styled.Members>
          <Styled.MembersHeader>
            <Styled.MemberTitle>
              참여 멤버
              <Styled.MemberCount>
                {`(${chatMemberList.length})`}
              </Styled.MemberCount>
            </Styled.MemberTitle>
            {/* TODO: 추후 친구추가 기능 작업시 주석 해제 */}
            {/* <Plus title="친구 초대" width="24" height="24" /> */}
          </Styled.MembersHeader>
          <Styled.MembersContent>
            {chatMemberList.map((member) => (
              <Styled.Member key={member.id}>
                {/* TODO: 프로필 컴포넌트 머지되면 프로필 이미지 추가 */}
                <Styled.MemberName>{member.nickname}</Styled.MemberName>
                {member.isManager && (
                  <Styled.ManagerTag>방장</Styled.ManagerTag>
                )}
              </Styled.Member>
            ))}
          </Styled.MembersContent>
        </Styled.Members>
        <Styled.ExitRoom>
          <Styled.ExitButton type="button" onClick={handleOpenExitModal}>
            <Exit title="채팅방 나가기" width="24" height="24" />
          </Styled.ExitButton>
        </Styled.ExitRoom>
      </Styled.ChatRoomInfoDrawerContainer>
    </>
  );
};

export default ChatRoomInfoDrawer;
