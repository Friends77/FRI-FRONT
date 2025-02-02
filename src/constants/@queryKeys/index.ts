export const COMMON_KEYS = Object.freeze({
  CATEGORY: ['category'],
});

export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
});

export const CHAT_KEYS = Object.freeze({
  SECONDARY_TOKEN: ['secondary-token'],
  CHAT_LIST: ['chat-list'],
  CHAT_MESSAGES: (roomId: number) => ['chat-messages', roomId],
  CHAT_DETAIL: (roomId: number) => ['chat-detail', roomId],
  CHAT_MEMBER_LIST: (roomId: number) => ['chat-member-list', roomId],
  CHAT_NEW_MEMBER_PROFILE: (roomId: number, memberId: number) => [
    'chat-member-profile',
    roomId,
    memberId,
  ],
});
