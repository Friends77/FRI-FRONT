import { atom } from "recoil";

const accessTokenAtom = atom<null | string>({
  key: "accessToken",
  default: null,
});

export default accessTokenAtom;
