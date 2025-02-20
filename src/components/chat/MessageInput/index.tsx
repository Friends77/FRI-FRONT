import PhotoMessage from '@/components/@common/SVG/Icon/PhotoMessage';
import * as Styled from './MessageInput.styled';
import SendMessage from '@/components/@common/SVG/Icon/SendMessage';
import { Theme } from '@/styles/theme';
import { useMutation } from '@tanstack/react-query';
import { imageUpload } from '@/apis/@common';
import { ISendMyMessageForm, MessageType } from '@/types/chat';
import { useRef } from 'react';

interface IMessageInputProps {
  value: string;
  setMyMessageContent: React.Dispatch<React.SetStateAction<string>>;
  onSendMessage: (message: ISendMyMessageForm) => void;
}

const MessageInput = ({
  value,
  setMyMessageContent,
  onSendMessage,
}: IMessageInputProps) => {
  const imagePathList = useRef<string[]>([]);

  const imageMessageCount = useRef<number>(0);

  const { mutate: uploadImage } = useMutation({
    mutationFn: imageUpload,
    onSuccess: (path) => {
      imagePathList.current = [...imagePathList.current, path];

      if (imageMessageCount.current === imagePathList.current.length) {
        onSendMessage({
          messageType: MessageType.IMAGE,
          imagePath: imagePathList.current.join(','),
        });
      }
    },
    onError: () => {
      alert('이미지 업로드에 실패하였습니다.');
    },
  });

  const handleMyMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyMessageContent(e.target.value);
  };

  const handleMessageSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (value) {
        onSendMessage({ messageType: MessageType.TEXT });
      }
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      if (files.length > 20) {
        window.alert('최대 20장까지 업로드 가능합니다');

        return;
      }

      for (let i = 0; i < files.length; i++) {
        imageMessageCount.current = files.length;
        const formData = new FormData();
        formData.append('image', files[i]);
        uploadImage(formData);
      }
    }
  };

  return (
    <Styled.MessageInputFormContainer>
      <Styled.MessageInputForm>
        <Styled.MessageInputLabel>
          <Styled.MessageInput
            className="message-input__textarea"
            value={value}
            onChange={handleMyMessageChange}
            placeholder="메세지를 입력해주세요"
            rows={1}
            onKeyPress={handleMessageSend}
          />
        </Styled.MessageInputLabel>
        <Styled.PhotoMessageLabel>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUploadImage}
            multiple
          />
          <PhotoMessage title="사진 업로드" width="32" height="32" />
        </Styled.PhotoMessageLabel>
        <Styled.SendButton
          type="button"
          disabled={!value}
          onClick={() => onSendMessage({ messageType: MessageType.TEXT })}
        >
          <SendMessage
            title="전송하기"
            width="32"
            height="32"
            color={value ? Theme.colors.Blue_500 : Theme.colors.Gray_300}
            subColor={value ? Theme.colors.White : Theme.colors.Gray_500}
          />
        </Styled.SendButton>
      </Styled.MessageInputForm>
    </Styled.MessageInputFormContainer>
  );
};

export default MessageInput;
