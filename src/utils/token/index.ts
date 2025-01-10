export const getMemberIdFromToken = (accessToken: string | null) => {
  if (!accessToken) return null;

  const payload = accessToken.split('.')[1];
  // Base64 디코딩 후 JSON 파싱
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload.memberId;
};
