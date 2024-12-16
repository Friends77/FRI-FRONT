export const getTokenPayload = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]));
};
