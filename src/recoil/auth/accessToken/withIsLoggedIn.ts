import { selector } from "recoil";
import accessTokenAtom from "./atom";

const accessTokenWithIsLoggedIn = selector({
  key: "accessTokenWithIsLoggedIn",
  get: ({ get }) => {
    const accessToken = get(accessTokenAtom);

    return !!accessToken;
  },
});

export default accessTokenWithIsLoggedIn;
