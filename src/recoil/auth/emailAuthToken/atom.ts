import { atom } from "recoil";

const emailAuthTokenAtom = atom<null | string>({
  key: "emailAuthToken",
  default: null,
});

export default emailAuthTokenAtom;
