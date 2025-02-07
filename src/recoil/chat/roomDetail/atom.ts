import { IChatRoomDetailResponse } from '@/types/chat';
import { atom } from 'recoil';

export const roomDetailAtom = atom<IChatRoomDetailResponse | null>({
  key: 'roomDetailAtom',
  default: null,
});

export default roomDetailAtom;
