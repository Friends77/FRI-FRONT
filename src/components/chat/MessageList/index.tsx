import * as Styled from './MessageList.styled';
import MyMessage from '../MyMessage';
import { useRecoilState, useRecoilValue } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import SystemMessage from '../SystemMessage';
import OtherMessage from '../OtherMessage';
import React, { forwardRef, useEffect, useState } from 'react';
import {
  failedMessageAtom,
  pendingMessageAtom,
  selectedImageMessageAtom,
  sentMessageAtom,
} from '@/recoil/chat/message';
import { ISentMessageItem } from '@/types/chat';
import DateMessage from '../DateMessage';
import PreviewMessage from '../PreviewMessage';
import {
  isSameDate,
  isSameSender,
  isSameTime,
  isShowSendTime,
} from '@/utils/message';
import ImageViewer from '@/components/@common/ImageViewer';

interface IMessageListProps {
  isShowPreviewMessage: boolean;
  onPreviewMessageClick: () => void;
  previewMessage: ISentMessageItem | null;
}

const MessageList = forwardRef<HTMLUListElement, IMessageListProps>(
  (
    {
      isShowPreviewMessage,
      onPreviewMessageClick,
      previewMessage,
    }: IMessageListProps,
    ref,
  ) => {
    const pendingMessageList = useRecoilValue(pendingMessageAtom);
    const sentMessageList = useRecoilValue(sentMessageAtom);
    const failedMessageList = useRecoilValue(failedMessageAtom);
    const myProfile = useRecoilValue(profileAtom);
    const [selectedImageMessage, setSelectedImageMessage] = useRecoilState(
      selectedImageMessageAtom,
    );

    const [isShowImageViewer, setIsShowImageViewer] = useState(false);

    const handleImageViewerClose = () => {
      setIsShowImageViewer(false);
      setSelectedImageMessage({ message: null, selectedImageIndex: 0 });
    };

    useEffect(() => {
      if (selectedImageMessage.message) {
        setIsShowImageViewer(true);
      }
    }, [selectedImageMessage.message]);

    return (
      <>
        {isShowImageViewer && selectedImageMessage.message && (
          <ImageViewer
            imageList={selectedImageMessage.message.content.split(',')}
            alt="채팅 이미지"
            onClose={handleImageViewerClose}
            selectedImageIndex={selectedImageMessage.selectedImageIndex}
          />
        )}

        <Styled.MessageList ref={ref}>
          {sentMessageList.map((sentMessage, index) => {
            const isSystemMessage = sentMessage.type.startsWith('SYSTEM');
            const isMyMessage =
              !isSystemMessage && sentMessage.senderId === myProfile?.memberId;
            const isOtherMessage =
              !isSystemMessage && sentMessage.senderId !== myProfile?.memberId;

            return (
              <React.Fragment key={`${sentMessage.createdAt}-${index}`}>
                {!isSameDate({
                  currentMessage: sentMessage,
                  prevMessage: sentMessageList[index - 1],
                  index,
                }) && <DateMessage timestamp={sentMessage.createdAt} />}
                {isSystemMessage && <SystemMessage message={sentMessage} />}
                {isMyMessage && (
                  <MyMessage
                    status="sent"
                    message={sentMessage}
                    isShowSendTime={isShowSendTime({
                      currentMessage: sentMessage,
                      nextMessage: sentMessageList[index + 1],
                      index,
                      length: sentMessageList.length,
                    })}
                    isSameSender={isSameSender({
                      currentMessage: sentMessage,
                      prevMessage: sentMessageList[index - 1],
                      index,
                    })}
                    isSameTime={isSameTime({
                      currentMessage: sentMessage,
                      prevMessage: sentMessageList[index - 1],
                      index,
                    })}
                  />
                )}
                {isOtherMessage && (
                  <OtherMessage
                    message={sentMessage}
                    isShowSendTime={isShowSendTime({
                      currentMessage: sentMessage,
                      nextMessage: sentMessageList[index + 1],
                      index,
                      length: sentMessageList.length,
                    })}
                    isSameTime={isSameTime({
                      currentMessage: sentMessage,
                      prevMessage: sentMessageList[index - 1],
                      index,
                    })}
                    isSameSender={isSameSender({
                      currentMessage: sentMessage,
                      prevMessage: sentMessageList[index - 1],
                      index,
                    })}
                  />
                )}
              </React.Fragment>
            );
          })}

          {pendingMessageList.map((pendingMessage) => (
            <MyMessage
              key={pendingMessage.clientMessageId}
              status="pending"
              message={pendingMessage}
            />
          ))}

          {failedMessageList.map((failedMessage) => (
            <MyMessage
              key={failedMessage.clientMessageId}
              status="failed"
              message={failedMessage}
            />
          ))}

          {isShowPreviewMessage && previewMessage && (
            <PreviewMessage
              message={previewMessage}
              onClick={onPreviewMessageClick}
            />
          )}
        </Styled.MessageList>
      </>
    );
  },
);

export default MessageList;
