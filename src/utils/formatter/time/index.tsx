export function formattedTime(value: number) {
  const formattedSeconds = Math.floor(value / 1000);

  const minutes = String(Math.floor(formattedSeconds / 60)).padStart(2, "0");
  const seconds = String(Math.floor(formattedSeconds % 60)).padStart(2, "0");

  return `${minutes}:${seconds}`;
}
