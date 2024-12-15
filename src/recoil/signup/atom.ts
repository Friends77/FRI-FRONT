import { atom } from "recoil";

const signUpFormData = atom({
  key: "signUp",
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

export default signUpFormData;
