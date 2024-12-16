export const getTokenPayload = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export const getTokenExpDate = (token: string) => {
  const payload = getTokenPayload(token);
  const expirationDate = new Date(payload.exp * 1000);

  return expirationDate;
};
