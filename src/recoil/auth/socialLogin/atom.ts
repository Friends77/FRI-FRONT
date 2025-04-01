import { ISocialAuthInfo } from '@/types/auth';
import { atom } from 'recoil';

const socialAuthInfoAtom = atom<ISocialAuthInfo | null>({
  key: 'socialAuthInfoAtom',
  default: null,
});

export default socialAuthInfoAtom;
