export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
  FRIEND_LIST: ['friend-list'],
});

export const CHAT_KEYS = Object.freeze({
  SECONDARY_TOKEN: ['secondary-token'],
  CHAT_LIST: (keyword?: string) =>
    keyword ? ['chat-list'] : ['chat-list', keyword],
  CHAT_MESSAGES: (roomId: number) => ['chat-messages', roomId],
});

export const HOME_KEYS = Object.freeze({
  RECOMMENDED_ROOMS_BY_TAGS: ['chat-rooms-by-tag'],
});
