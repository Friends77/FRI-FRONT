import { atom } from 'recoil';

const socketConnectedAtom = atom({
  key: 'socketConnectedAtom',
  default: false,
});

export default socketConnectedAtom;
