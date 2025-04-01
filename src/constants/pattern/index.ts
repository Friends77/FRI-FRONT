export const AUTH_PATTERN = Object.freeze({
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S{8,20}$).*/,
  NICKNAME: /^[a-zA-Z0-9가-힣]{2,20}$/,
});
