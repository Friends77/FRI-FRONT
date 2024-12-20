import { atom } from "recoil";

const resetPasswordStepAtom = atom({
  key: "resetPasswordStep",
  default: 1,
});

export default resetPasswordStepAtom;
