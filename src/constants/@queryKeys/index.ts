export const COMMON_KEYS = Object.freeze({
  CATEGORY: ['category'],
  USER_PROFILE: (memberId: number) => ['user_profile', memberId],
  RECOMMENDED_USERS: ['recommended-users'],
  SECONDARY_TOKEN: (type: 'chat' | 'alarm') => ['secondary-token', type],
});

export const USER_KEYS = Object.freeze({
  PROFILE: (id: number) => ['profile', id],
  FRIEND_LIST: ['friend-list'],
  UNREAD_ALARM_COUNT: ['unread-alarm-count'],
  ALARM_LIST: ['alarm-list'],
  CHECK_AVAILABILITY: ['check-availability'],
});

export const CHAT_KEYS = Object.freeze({
  CHAT_LIST: ['chat-list'],
  CHAT_DETAIL: (roomId: number) => ['chat-detail', roomId],
  CHAT_MEMBER_LIST: (roomId: number) => ['chat-member-list', roomId],
  CHAT_NEW_MEMBER_PROFILE: (roomId: number, memberId: number) => [
    'chat-member-profile',
    roomId,
    memberId,
  ],
  CHAT_MEMBER_LIST_TO_INVITE: (roomId: number, keyword?: string) => [
    'chat-member-list-to-invite',
    roomId,
    keyword || '',
  ],
});

export const HOME_KEYS = Object.freeze({
  RECOMMENDED_ROOMS_BY_TAGS: (categoryId: number) => [
    'chat-rooms-by-tag',
    categoryId,
  ],
  RECOMMENDED_FRIENDS_BY_TAGS: (categoryId: number) => [
    'friends-by-tag',
    categoryId,
  ],
});
