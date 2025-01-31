export const getDaysInMonth = (year: number, month: number) => {
  // 해당 년월의 마지막 일자
  const lastDay = new Date(year, month, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) => {
    const day = String(index + 1);
    return {
      value: day.padStart(2, '0'),
      label: day,
    };
  });
};
