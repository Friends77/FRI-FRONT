import { getCookie } from "@/utils/cookie";
import { atom } from "recoil";

const isLoggedInAtom = atom<boolean>({
  key: "isLoggedIn",
  default: !!getCookie("accessToken"),
});

export default isLoggedInAtom;
