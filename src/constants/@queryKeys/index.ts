export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
  FRIEND_LIST: ['friend-list'],
});

export const CHAT_KEYS = Object.freeze({
<<<<<<< HEAD
  SECONDARY_TOKEN: ['secondary-token'],
  CHAT_LIST: (keyword?: string) =>
    keyword ? ['chat-list'] : ['chat-list', keyword],
  CHAT_MESSAGES: (roomId: number) => ['chat-messages', roomId],
=======
  CHAT_LIST: (keyword?: string) =>
    keyword ? ['chat-list'] : ['chat-list', keyword],
>>>>>>> 053ee204a19428dbf22c746d5cbd5db0da1505c6
});
