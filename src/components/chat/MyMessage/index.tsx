import { IPendingMessageItem, ISentMessageItem } from '@/types/chat';
import * as Styled from './MyMessage.styled';
import LoadingMessage from '@/components/@common/SVG/Icon/LoadingMessage';
import Resend from '@/components/@common/SVG/Icon/Resend';
import DeleteMessage from '@/components/@common/SVG/Icon/DeleteMessage';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import {
  failedMessageAtom,
  selectedImageMessageAtom,
} from '@/recoil/chat/message';
import { format } from 'date-fns';
import { CHAT_CONSTANT } from '@/constants/chat';

interface IMyMessageProps {
  status: 'pending' | 'sent' | 'failed';
  message: IPendingMessageItem | ISentMessageItem;
  isShowSendTime?: boolean;
  isSameTime?: boolean;
  isSameSender?: boolean;
}

const MyMessage = ({
  status,
  message,
  isShowSendTime = false,
  isSameTime = false,
  isSameSender = false,
}: IMyMessageProps) => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const socketConnected = useRecoilValue(socketConnectedAtom);
  const sendMessageToServer = useRecoilValue(sendMessageHandlerAtom);
  const [failedMessageList, setFailedMessageList] =
    useRecoilState(failedMessageAtom);
  const setSelectedImageMessage = useSetRecoilState(selectedImageMessageAtom);

  const handleResendMessage = (clientMessageId: string) => {
    if (socketConnected && roomId) {
      const failedMessage = failedMessageList.find(
        (failedMessage) => clientMessageId === failedMessage.clientMessageId,
      );

      if (failedMessage && sendMessageToServer) {
        const messageForm = {
          chatRoomId: roomId,
          clientMessageId: failedMessage.clientMessageId,
          message: failedMessage.content,
        };

        sendMessageToServer(messageForm);
      }
    }
  };

  const handleDeleteMessage = (clientMessageId: string) => {
    setFailedMessageList((prevList) =>
      prevList.filter((message) => message.clientMessageId !== clientMessageId),
    );
  };

  const handleImageMessageClick = (index: number) => {
    setSelectedImageMessage({ selectedImageIndex: index, message });
  };

  return (
    <>
      <Styled.MyMessageItem
        $isSameTime={isSameTime}
        $isSameSender={isSameSender}
      >
        {status === 'sent' && isShowSendTime && (
          <Styled.SendTime>
            {format((message as ISentMessageItem).createdAt, 'h:mm a')}
          </Styled.SendTime>
        )}
        {status === 'pending' && (
          <Styled.LoadingMessage>
            <LoadingMessage title="로딩중" width="16" height="16" />
            전송중
          </Styled.LoadingMessage>
        )}
        {status === 'failed' && (
          <Styled.FailedButtonContainer>
            <button
              onClick={() =>
                handleResendMessage(
                  (message as IPendingMessageItem).clientMessageId,
                )
              }
            >
              <Resend title="재전송하기" width="24" height="24" />
            </button>
            <button
              onClick={() =>
                handleDeleteMessage(
                  (message as IPendingMessageItem).clientMessageId,
                )
              }
            >
              <DeleteMessage title="메세지 삭제하기" width="24" height="24" />
            </button>
          </Styled.FailedButtonContainer>
        )}
        {message.type === 'TEXT' && (
          <Styled.MessageContent>{message.content}</Styled.MessageContent>
        )}
        {message.type === 'IMAGE' && (
          <Styled.ImageMessageContainer>
            {message.content
              .split(',')
              .slice(0, CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES)
              .map((path, index) => (
                <Styled.ImageMessageButton
                  key={`${path}-${index}`}
                  type="button"
                  onClick={() => handleImageMessageClick(index)}
                >
                  <Styled.ImageMessageContent src={path} alt="이미지 메세지" />
                </Styled.ImageMessageButton>
              ))}
            {message.content.split(',').length >
              CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES && (
              <Styled.DimmedImage>{`+${
                message.content.split(',').length -
                CHAT_CONSTANT.MAX_VISIBLE_IMAGE_MESSAGES
              }`}</Styled.DimmedImage>
            )}
          </Styled.ImageMessageContainer>
        )}
      </Styled.MyMessageItem>
    </>
  );
};

export default MyMessage;
