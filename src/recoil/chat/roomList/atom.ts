import { IMyChatItem } from '@/types/chat';
import { atom } from 'recoil';

const roomListAtom = atom<IMyChatItem[]>({
  key: 'chatRoomList',
  default: [],
});

export default roomListAtom;
