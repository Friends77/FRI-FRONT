import { atom } from 'recoil';

const alarmSocketConnectedAtom = atom({
  key: 'alarmSocketConnectedAtom',
  default: false,
});

export default alarmSocketConnectedAtom;
