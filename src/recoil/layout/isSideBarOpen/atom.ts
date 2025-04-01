import { atom } from 'recoil';

const isSideBarOpenAtom = atom<boolean>({
  key: 'isSideBarOpen',
  default: true,
});

export default isSideBarOpenAtom;
