import { ChatRoomType } from '@/types/chat';
import { atom } from 'recoil';

const chatRoomListAtom = atom<ChatRoomType[]>({
  key: 'chatRoomList',
  default: [],
});

export default chatRoomListAtom;
