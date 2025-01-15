import { Profile } from '@/types/user';
import { atom } from 'recoil';

const profileAtom = atom<null | Profile>({
  key: 'profile',
  default: null,
});

export default profileAtom;
