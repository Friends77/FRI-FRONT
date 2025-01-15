import { atom } from 'recoil';

export const messageSubscribersAtom = atom<Set<(data: string) => void>>({
  key: 'messageSubscribersAtom',
  default: new Set(),
});

export default messageSubscribersAtom;
