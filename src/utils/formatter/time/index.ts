import { differenceInYears, isBefore } from 'date-fns';

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

export const getInternationalAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();

  const age = differenceInYears(today, birth);

  return isBefore(
    today,
    new Date(today.getFullYear(), birth.getMonth(), birth.getDate()),
  )
    ? age - 1
    : age;
};
