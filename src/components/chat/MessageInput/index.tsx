interface IMessageInputProps {
  value: string;
  setMyMessageContent: React.Dispatch<React.SetStateAction<string>>;
  onSendMessage: (e: React.FormEvent) => void;
}

const MessageInput = ({
  value,
  setMyMessageContent,
  onSendMessage,
}: IMessageInputProps) => {
  const handleMyMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyMessageContent(e.target.value);
  };

  return (
    <form onSubmit={onSendMessage}>
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
