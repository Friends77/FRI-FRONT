import * as Styled from './ChatInvitationDialog.styled';
import CustomModal from '@/components/@common/Modal/CustomModal';
import ProfileImage from '@/components/@common/ProfileImage';
import useSendChatInvite from '@/hooks/chat/useSendChatInvite';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface IChatInvitationDialog {
  title: string;
  onClose: () => void;
}

const ChatInvitationDialog = ({ title, onClose }: IChatInvitationDialog) => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const { mutate: sendChatInvitation } = useSendChatInvite({
    onSuccessHandler: () => {
      // TODO: 초대 친구리스트 다시불러오기
    },
  });

  const methods = useForm<{ keyword: string }>({
    defaultValues: {
      keyword: '',
    },
  });

  const handleSendChatInvitation = (friendId: number) => {
    sendChatInvitation({ roomId, friendId });
  };

  return (
    <CustomModal title={title} onClose={onClose}>
      <FormProvider {...methods}>
        <Styled.SearchInput />
        <Styled.FriendList>
          <Styled.FriendItem>
            <Styled.Profile>
              <Styled.Image
                size={56}
                src="data:image/jpeg;base64,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"
                alt="닉네임"
              />
              <Styled.InfoContent>
                <Styled.Nickname>지오니</Styled.Nickname>
                <Styled.Description>안녕하세요</Styled.Description>
              </Styled.InfoContent>
            </Styled.Profile>
            <Styled.InvitationButton
              type="button"
              // disabled={}
              $status="AVAILABLE"
              // onClick={() => handleSendChatInvitation(member.id)}
            >
              초대하기
            </Styled.InvitationButton>
          </Styled.FriendItem>
        </Styled.FriendList>
      </FormProvider>
    </CustomModal>
  );
};

export default ChatInvitationDialog;
