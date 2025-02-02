import { IChatMemberProfileItem } from '@/types/chat';
import { atom } from 'recoil';

export const chatMembersAtom = atom<IChatMemberProfileItem[]>({
  key: 'chatMembersAtom',
  default: [],
});

export default chatMembersAtom;
