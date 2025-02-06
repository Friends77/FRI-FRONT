import { createMonthOption } from '@/utils/date';

const MONTH_COUNT = 12;

export const BIRTH_MONTH = Array.from({ length: MONTH_COUNT }, (_, i) =>
  createMonthOption(i),
);
