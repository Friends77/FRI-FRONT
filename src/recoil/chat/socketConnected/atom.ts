import { atom } from 'recoil';

const chatSocketConnectedAtom = atom({
  key: 'chatSocketConnectedAtom',
  default: false,
});

export default chatSocketConnectedAtom;
