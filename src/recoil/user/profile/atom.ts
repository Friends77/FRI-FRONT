import { IProfileResponse } from '@/types/user';
import { atom } from 'recoil';

const profileAtom = atom<null | IProfileResponse>({
  key: 'profile',
  default: null,
});

export default profileAtom;
