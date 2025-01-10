import { IChatMessageItem } from '@/types/chat';
import { atom } from 'recoil';

const messageAtom = atom<IChatMessageItem[]>({
  key: 'chatMessage',
  default: [],
});

export default messageAtom;
