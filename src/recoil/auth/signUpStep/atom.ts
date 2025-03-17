import { atom } from 'recoil';

const signUpStepAtom = atom({
  key: 'signUpStep',
  default: 1,
});

export default signUpStepAtom;
