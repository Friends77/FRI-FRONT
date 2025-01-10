export const ROOT_PATH = Object.freeze({
  ROOT: '/',
});

export const AUTH_PATH = Object.freeze({
  LOGIN: '/login',
  SIGN_UP: '/signup',
  NAVER_LOGIN_CALLBACK: '/oauth/naver/callback',
  GOOGLE_LOGIN_CALLBACK: '/oauth/google/callback',
  RESET_PASSWORD: '/reset-password',
});

export const CHAT_PATH = Object.freeze({
  CHAT_LIST: '/chat',
  CHAT_ROOM: '/chat/room/:roomId',
});
