import { IUserProfile } from '@/types/@common';
import { atom } from 'recoil';

const profileAtom = atom<null | IUserProfile>({
  key: 'profile',
  default: null,
});

export default profileAtom;
