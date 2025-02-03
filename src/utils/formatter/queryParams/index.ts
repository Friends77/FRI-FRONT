export const createQueryParams = (params: { [key: string]: any }) => {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

  return query ? `?${query}` : '';
};
