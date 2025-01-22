import { IMyChatItem } from '@/types/chat';
import { atom } from 'recoil';

const chatRoomListAtom = atom<IMyChatItem[]>({
  key: 'chatRoomList',
  default: [],
});

export default chatRoomListAtom;
