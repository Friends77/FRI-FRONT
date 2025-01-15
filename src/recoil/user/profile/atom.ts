import { ProfileType } from '@/types/user';
import { atom } from 'recoil';

const profileAtom = atom<null | ProfileType>({
  key: 'profile',
  default: null,
});

export default profileAtom;
