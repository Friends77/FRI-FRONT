import { useRecoilValue } from 'recoil';
import * as Styled from './ChatRoomInfoDrawer.styled';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { imageMessagesSelector } from '@/recoil/chat/message';
import { CHAT_CONSTANT } from '@/constants/chat';
import chatMembersAtom from '@/recoil/chat/member';
import Exit from '@/components/@common/SVG/Icon/Exit';
import Close from '@/components/@common/SVG/Icon/Close';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/@common/Modal/ConfirmModal';
import useExitChatRoom from '@/hooks/chat/useExitChatRoom';
import { useParams } from 'react-router';
import ProfileImage from '@/components/@common/ProfileImage';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';
import useGetProfile from '@/hooks/@common/useGetProfile';
import { IUserProfile } from '@/types/@common';
import profileAtom from '@/recoil/user/profile';
import AddFriend from '@/components/@common/SVG/Icon/AddFriend';
import { FriendsStatus } from '@/types/chat';
import useFriendRequest from '@/hooks/user/useFriendRequest';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import ChatInvitationDialog from '../ChatInvitationDialog';
import Tag from '@/components/@common/Tag';

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
  const queryClient = useQueryClient();

  const chatRoomDetail = useRecoilValue(roomDetailAtom);
  const imageMessages = useRecoilValue(imageMessagesSelector);
  const chatMemberList = useRecoilValue(chatMembersAtom);
  const myProfile = useRecoilValue(profileAtom);

  const [isOpenExitModal, setIsOpenExitModal] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenInvitationDialog, setIsOpenInvitationDialog] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
    null,
  );

  const { mutate: exitChatRoom } = useExitChatRoom();
  const { mutate: addFriend } = useFriendRequest({
    onSuccessHandler: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_MEMBER_LIST(roomId),
      });
    },
  });
  const { data: userProfile } = useGetProfile(selectedProfileId);

  useEffect(() => {
    if (userProfile) {
      setSelectedProfile(userProfile);
    }
  }, [userProfile]);

  const handleOpenExitModal = () => {
    setIsOpenExitModal(true);
  };

  const handleExitChatRoom = () => {
    exitChatRoom(roomId);
  };

  const handleCancelExitChat = () => {
    setIsOpenExitModal(false);
  };

  const handleOpenProfile = (memberId: number) => {
    setSelectedProfileId(memberId);
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedProfileId(null);
    setSelectedProfile(null);
    setIsOpenProfile(false);
  };

  const handleAddFriend = (friendId: number) => {
    addFriend(friendId);
  };

  const handleOpenInvitationDialog = () => {
    setIsOpenInvitationDialog(true);
  };

  const handleCloseInvitationDialog = () => {
    setIsOpenInvitationDialog(false);
  };

  return (
    <>
      {isOpenExitModal && (
        <ConfirmModal
          title={`${chatRoomDetail?.title}을(를) 나가시겠습니까?`}
          confirmButtonText="취소"
          cancelButtonText="나가기"
          onCancel={handleExitChatRoom}
          onConfirm={handleCancelExitChat}
          description="채팅방을 나가면 더 이상 메시지를 받을 수 없습니다."
        />
      )}

      {isOpenProfile && selectedProfile && (
        <ProfileDialog profile={selectedProfile} onClose={handleCloseProfile} />
      )}

      {isOpenInvitationDialog && (
        <ChatInvitationDialog
          title={`${chatRoomDetail?.title} 초대하기`}
          onClose={handleCloseInvitationDialog}
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
          {chatRoomDetail?.categoryIdList.map((tag) => (
            <Tag key={tag.id} size="large" icon={tag.image} label={tag.name} />
          ))}
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
                .map((path, index) => (
                  <li key={`${path}-${index}`}>
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
            <Styled.InvitationButton
              type="button"
              onClick={handleOpenInvitationDialog}
            >
              <Plus title="친구 초대" width="24" height="24" />
            </Styled.InvitationButton>
          </Styled.MembersHeader>
          <Styled.MembersContent>
            {chatMemberList.map((member) => (
              <Styled.Member key={member.id}>
                <Styled.MemberInfo>
                  <Styled.ShowProfileButton
                    type="button"
                    onClick={() => handleOpenProfile(member.id)}
                  >
                    <ProfileImage
                      size={32}
                      src={member.profileImageUrl}
                      alt="프로필 이미지"
                    />
                  </Styled.ShowProfileButton>
                  <Styled.MemberName $isMe={myProfile?.memberId === member.id}>
                    {myProfile?.memberId === member.id ? '나' : member.nickname}
                  </Styled.MemberName>
                  {member.isManager && (
                    <Styled.ManagerTag>방장</Styled.ManagerTag>
                  )}
                </Styled.MemberInfo>
                {(member.friendshipStatusEnums === FriendsStatus.AVAILABLE ||
                  member.friendshipStatusEnums === FriendsStatus.REQUESTED) && (
                  <Styled.MemberFriendStatus
                    onClick={() => handleAddFriend(member.id)}
                    disabled={
                      member.friendshipStatusEnums === FriendsStatus.REQUESTED
                    }
                    $friendStatus={member.friendshipStatusEnums}
                  >
                    {member.friendshipStatusEnums ===
                      FriendsStatus.AVAILABLE && (
                      <>
                        <AddFriend title="친구 신청" width="24" height="24" />
                        친구신청
                      </>
                    )}

                    {member.friendshipStatusEnums === FriendsStatus.REQUESTED &&
                      '수락 대기중'}
                  </Styled.MemberFriendStatus>
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
