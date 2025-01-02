import { getCookie } from '@/utils/cookie';
import { atom } from 'recoil';

const isLoggedInAtom = atom<null | boolean>({
  key: 'isLoggedIn',
  default: !!getCookie('isLoggedIn'),
});

export default isLoggedInAtom;
