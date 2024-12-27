import { sendSocialLoginToken } from "@/apis/auth";
import { AUTH_PATH, ROOT_PATH } from "@/constants/routes";
import accessTokenAtom from "@/recoil/auth/accessToken";
import signUpStepAtom from "@/recoil/auth/signUp/atom";
import socialAuthInfoAtom from "@/recoil/auth/socialLogin/atom";
import { moveToStep } from "@/utils/step/moveSteps";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";

interface ISocialLogin {
  socialType: "GOOGLE" | "NAVER";
}

export const useSocialLogin = ({ socialType }: ISocialLogin) => {
  const navigate = useNavigate();

  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setSocialAuthInfo = useSetRecoilState(socialAuthInfoAtom);
  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  return useMutation({
    mutationFn: sendSocialLoginToken,
    onSuccess: ({ accessToken }) => {
      if (accessToken) {
        setAccessToken(accessToken);
        navigate(ROOT_PATH.ROOT);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const { status } = error;

        if (status === 401) {
          alert("다시 로그인해 주세요.");

          if (socialType === "NAVER") {
            navigate(AUTH_PATH.LOGIN);
          }
        }

        if (status === 409) {
          alert("다른 소셜 서비스에 가입되어 있습니다.");
        }

        if (status === 422) {
          // 가입X, 가입정보 저장, 프로필 설정 페이지로 이동
          setSocialAuthInfo(error.response?.data);
          moveToStep("next", setSignUpStep);
          navigate(AUTH_PATH.SIGN_UP);
        }
      }
    },
  });
};
