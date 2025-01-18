import { v4 as uuidv4 } from 'uuid';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import { IPendingMessageItem } from '@/types/chat';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import profileAtom from '@/recoil/user/profile';

interface IMessageInputProps {
  value: string;
  setMyMessageContent: React.Dispatch<React.SetStateAction<string>>;
  setPendingMessageList: React.Dispatch<
    React.SetStateAction<IPendingMessageItem[]>
  >;
}

const MessageInput = ({
  value,
  setMyMessageContent,
  setPendingMessageList,
}: IMessageInputProps) => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const socketConnected = useRecoilValue(socketConnectedAtom);
  const sendMessageToServer = useRecoilValue(sendMessageHandlerAtom);
  const myProfile = useRecoilValue(profileAtom);

  const handleMyMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyMessageContent(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    // if (socketConnected && roomId && myProfile) {
    if (socketConnected && roomId) {
      e.preventDefault();
      const id = uuidv4();

      // TODO: 서버 필드 변경되면 확인하기, message => content
      const myMessageForm = {
        chatRoomId: roomId,
        // clientMessageId: id,
        // content: value,
        // type: 'TEXT',
        message: value,
      };

      if (sendMessageToServer) {
        sendMessageToServer(myMessageForm);
      }

      // TODO: 메세지 타입 수정
      setPendingMessageList((prevList) => [
        ...prevList,
        {
          ...myMessageForm,
          clientMessageId: id,
          content: value,
          type: 'TEXT',
          // senderId: myProfile.memberId,
          senderId: 1, // TODO: 로그인한 사용자 ID로 고정 (임시)
        },
      ]);

      setMyMessageContent('');
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <textarea
        value={value}
        onChange={handleMyMessageChange}
        placeholder="메세지를 입력해주세요"
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default MessageInput;
