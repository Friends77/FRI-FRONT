interface IMessageInputProps {
  value: string;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const MessageInput = ({
  value,
  onMessageChange,
  onSendMessage,
}: IMessageInputProps) => {
  return (
    <form onSubmit={onSendMessage}>
      <textarea
        value={value}
        onChange={onMessageChange}
        placeholder="메세지를 입력해주세요"
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default MessageInput;
