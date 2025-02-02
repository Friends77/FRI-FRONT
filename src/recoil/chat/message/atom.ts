import {
  IPendingMessageItem,
  ISelectedImageMessageViewer,
  ISentMessageItem,
} from '@/types/chat';
import { atom } from 'recoil';

export const pendingMessageAtom = atom<IPendingMessageItem[]>({
  key: 'pendingMessageAtom',
  default: [],
});

export const sentMessageAtom = atom<ISentMessageItem[]>({
  key: 'sentMessageAtom',
  default: [],
});

export const failedMessageAtom = atom<IPendingMessageItem[]>({
  key: 'failedMessageAtom',
  default: [],
});

export const selectedImageMessageAtom = atom<ISelectedImageMessageViewer>({
  key: 'selectedImageMessageAtom',
  default: {
    selectedImageIndex: 0,
    message: null,
  },
});
