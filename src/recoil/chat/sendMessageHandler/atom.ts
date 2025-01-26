import { ISendMessageHandler } from '@/types/chat';
import { atom } from 'recoil';

export const sendMessageHandlerAtom = atom<ISendMessageHandler | null>({
  key: 'sendMessageHandlerAtom',
  default: null,
});

export default sendMessageHandlerAtom;
