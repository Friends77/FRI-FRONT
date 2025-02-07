const MONTH_COUNT = 12;

const createMonthOption = (index: number) => {
  const month = String(index + 1);
  return {
    value: month.padStart(2, '0'),
    label: month,
  };
};

export const BIRTH_MONTH = Array.from({ length: MONTH_COUNT }, (_, i) =>
  createMonthOption(i),
);
