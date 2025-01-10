export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
});

export const CHAT_KEYS = Object.freeze({
  SECONDARY_TOKEN: () => ['secondary-token'],
  CHAT_LIST: () => ['chat-list'],
  CHAT_MESSAGES: (roomId: string) => ['chat-messages', roomId],
});
