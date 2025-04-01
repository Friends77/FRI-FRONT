import { atom } from 'recoil';

const hasAlarmAtom = atom<boolean>({
  key: 'hasAlarmAtom',
  default: false,
});

export default hasAlarmAtom;
