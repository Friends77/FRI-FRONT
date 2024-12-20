import { refresh } from "@/apis/auth";
import accessTokenAtom from "@/recoil/auth/accessToken";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

export const useRefresh = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: () => {
      return refresh();
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });
};
