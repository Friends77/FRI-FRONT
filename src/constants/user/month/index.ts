import { createMonthOption } from '@/utils/date';

export const MONTH_CONSTANT = Object.freeze({
  MONTH_COUNT: 12,
});

export const BIRTH_MONTH = Array.from(
  { length: MONTH_CONSTANT.MONTH_COUNT },
  (_, i) => createMonthOption(i),
);
