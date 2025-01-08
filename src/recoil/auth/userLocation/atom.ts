import { atom } from 'recoil';

const userLocationAtom = atom({
  key: 'userLocation',
  default: {
    latitude: 0,
    longitude: 0,
  },
});

export default userLocationAtom;
