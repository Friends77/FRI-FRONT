import { sendSocialLoginToken } from '@/apis/auth';
import { AUTH_CONSTANTS } from '@/constants/auth';
import { AUTH_PATH, ROOT_PATH } from '@/constants/routes';
import accessTokenAtom from '@/recoil/auth/accessToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import socialAuthInfoAtom from '@/recoil/auth/socialLogin';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

export const useSocialLogin = () => {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['isLoggedIn']);

  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const setSocialAuthInfo = useSetRecoilState(socialAuthInfoAtom);

  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  return useMutation({
    mutationFn: sendSocialLoginToken,
    onSuccess: ({
      isRegistered,
      authToken,
      nickname,
      email,
      imageUrl,
      accessToken,
      refreshTokenExpiration,
    }) => {
      if (!isRegistered && authToken && nickname && email && imageUrl) {
        setSocialAuthInfo({
          authToken,
          nickname,
          email,
          imageUrl,
        });
        setSignUpStep(AUTH_CONSTANTS.PROFILE_STEP);
        navigate(`${AUTH_PATH.SIGN_UP}?social=true`);
      }

      if (isRegistered && accessToken && refreshTokenExpiration) {
        const expires = new Date(refreshTokenExpiration);

        setAccessToken(accessToken);
        setIsLoggedIn(true);
        setCookie('isLoggedIn', true, {
          expires,
        });
        navigate(ROOT_PATH.ROOT);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const { status } = error;

        if (status === 401) {
          alert('다시 로그인해 주세요.');
          navigate(AUTH_PATH.LOGIN);
        }

        if (status === 409) {
          alert('해당 계정은 다른 소셜 서비스에 가입되어 있습니다.');
          navigate(AUTH_PATH.LOGIN);
        }
      }
    },
  });
};
