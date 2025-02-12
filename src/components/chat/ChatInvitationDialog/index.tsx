import * as Styled from './ChatInvitationDialog.styled';
import CustomModal from '@/components/@common/Modal/CustomModal';
import useGetFriendsToInvite from '@/hooks/chat/useGetFriendsToInvite';
import useSendChatInvite from '@/hooks/chat/useSendChatInvite';
import { FriendsInvitationStatus, IMemberWithStatus } from '@/types/chat';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface IChatInvitationDialog {
  title: string;
  onClose: () => void;
}

const ChatInvitationDialog = ({ title, onClose }: IChatInvitationDialog) => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);
  const [memberList, setMemberList] = useState<IMemberWithStatus[]>([]);

  const methods = useForm();
  const { watch } = methods;

  const { data: membersToInvite } = useGetFriendsToInvite({
    roomId,
    nickname: watch('keyword'),
  });

  const { mutate: sendChatInvitation } = useSendChatInvite({
    onSuccessHandler: ({ friendId }) => {
      setMemberList((prevList) =>
        prevList?.map((member) =>
          friendId === member.memberId
            ? { ...member, status: FriendsInvitationStatus.INVITED }
            : member,
        ),
      );
    },
  });

  const handleSendChatInvitation = (friendId: number) => {
    sendChatInvitation({ roomId, friendId });
  };

  useEffect(() => {
    if (membersToInvite) {
      const membersWithStatus = membersToInvite.content.map((member) => ({
        ...member,
        status: FriendsInvitationStatus.AVAILABLE,
      }));

      setMemberList(membersWithStatus);
    }
  }, [membersToInvite]);

  return (
    <CustomModal title={title} onClose={onClose}>
      <FormProvider {...methods}>
        <Styled.InvitationDialog>
          <Styled.SearchInput />
          {/* TODO: 서버에서 친구상태 추가되면 수정 */}
          {memberList.length > 0 ? (
            <Styled.FriendList>
              {memberList.map((member) => (
                <Styled.FriendItem key={member.memberId}>
                  <Styled.Profile>
                    <Styled.Image
                      size={56}
                      src={member.imageUrl}
                      alt={member.nickname}
                    />
                    <Styled.InfoContent>
                      <Styled.Nickname>{member.nickname}</Styled.Nickname>
                      {member.selfDescription && (
                        <Styled.Description>
                          {member.selfDescription}
                        </Styled.Description>
                      )}
                    </Styled.InfoContent>
                  </Styled.Profile>
                  <Styled.InvitationButton
                    type="button"
                    disabled={member.status === FriendsInvitationStatus.INVITED}
                    $status={member.status}
                    onClick={() => handleSendChatInvitation(member.memberId)}
                  >
                    {member.status === FriendsInvitationStatus.AVAILABLE
                      ? '초대하기'
                      : '전송됨'}
                  </Styled.InvitationButton>
                </Styled.FriendItem>
              ))}
            </Styled.FriendList>
          ) : (
            <Styled.EmptyFriendList>
              아직 등록된 친구가 없어요
            </Styled.EmptyFriendList>
          )}
        </Styled.InvitationDialog>
      </FormProvider>
    </CustomModal>
  );
};

export default ChatInvitationDialog;
