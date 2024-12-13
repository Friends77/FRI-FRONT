import { atom } from "recoil";

const signUpAtom = atom({
  key: "signUpAtom",
  default: {
    authToken: "",
    email: "",
    password: "",
    "confirm-password": "",
    nickname: "",
    birth: "",
    gender: "",
    selfDescription: "",
    MBTI: "",
    interestTag: "",
    imageUrl: "",
    certNo: "",
  },
});

export default signUpAtom;
