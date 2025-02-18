const startYear = 1920;

const currentYear = new Date().getFullYear();

export const BIRTH_YEAR = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => {
    const year: number = startYear + index;

    return { value: year, label: `${year}` };
  },
).reverse();
