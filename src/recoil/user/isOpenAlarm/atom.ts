import { atom } from 'recoil';

const isOpenAlarmAtom = atom<boolean>({
  key: 'isOpenAlarmAtom',
  default: false,
});

export default isOpenAlarmAtom;
