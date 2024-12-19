import { atom } from "recoil";

export type Auth = {
  isLoggedIn: boolean;
  accessToken: null | string;
};

const authAtom = atom({
  key: "auth",
  default: {
    isLoggedIn: false,
    accessToken: null,
  },
});

export default authAtom;
