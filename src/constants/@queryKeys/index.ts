export const COMMON_KEYS = Object.freeze({
  CATEGORY: ['category'],
  USER_PROFILE: (memberId: number) => ['user_profile', memberId],
});

export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
  FRIEND_LIST: ['friend-list'],
});

export const CHAT_KEYS = Object.freeze({
  SECONDARY_TOKEN: ['secondary-token'],
  CHAT_LIST: (keyword?: string) =>
    keyword ? ['chat-list'] : ['chat-list', keyword],
  CHAT_MESSAGES: (roomId: number) => ['chat-messages', roomId],
  CHAT_DETAIL: (roomId: number) => ['chat-detail', roomId],
  CHAT_MEMBER_LIST: (roomId: number) => ['chat-member-list', roomId],
  CHAT_NEW_MEMBER_PROFILE: (roomId: number, memberId: number) => [
    'chat-member-profile',
    roomId,
    memberId,
  ],
});

export const HOME_KEYS = Object.freeze({
  RECOMMENDED_ROOMS_BY_TAGS: ['chat-rooms-by-tag'],
});
