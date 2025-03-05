export const getRandomNumbers = (count: number, max: number = 34): number[] => {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }

  return Array.from(numbers);
};
