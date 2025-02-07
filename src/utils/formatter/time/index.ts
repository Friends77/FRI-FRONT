export const formattedTime = (value: number) => {
  const formattedSeconds = Math.floor(value / 1000);

  const minutes = String(Math.floor(formattedSeconds / 60)).padStart(2, '0');
  const seconds = String(Math.floor(formattedSeconds % 60)).padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const formatToHHMM = (isoString: string) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
