import { signUp } from '@/apis/auth';
import AdditionalInfoForm from '@/components/auth/Form/AdditionalInfoForm';
import AuthForm from '@/components/auth/Form/AuthForm';
import BasicInfoForm from '@/components/auth/Form/BasicInfoForm';
import { ALERT_MESSAGE } from '@/constants/message';
import { AUTH_PATH, ROOT_PATH } from '@/constants/routes';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import socialAuthInfoAtom from '@/recoil/auth/socialLogin';
import userLocationAtom from '@/recoil/auth/userLocation';
import { SignUpFormDataType } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { useRecoilValue } from 'recoil';

const SignUpPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROOT_PATH.ROOT);
    }
  }, [navigate, isLoggedIn]);

  const [searchParams] = useSearchParams();

  const { latitude, longitude } = useRecoilValue(userLocationAtom);

  const authToken = useRecoilValue(emailAuthTokenAtom) as string;

  const socialAuthInfo = useRecoilValue(socialAuthInfoAtom);

  // 회원가입 단계를 전역 상태로 관리
  const signUpStep = useRecoilValue(signUpStepAtom);

  const methods = useForm<SignUpFormDataType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      certno: '',
      password: '',
      'confirm-password': '',
      nickname: '',
      gender: 'MAN',
      EI: 'E',
      NS: 'N',
      FT: 'F',
      JP: 'J',
    },
  });

  const { handleSubmit } = methods;

  // 회원가입 mutate
  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert(ALERT_MESSAGE.SIGNUP_SUCCESS);
      navigate(AUTH_PATH.LOGIN);
    },
    onError: () => {
      alert(ALERT_MESSAGE.SIGNUP_FAILED);
    },
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = (data) => {
    const isSocialSignUp = searchParams.get('social') === 'true';

    const { imageUrl, year, month, day, EI, NS, FT, JP, ...formFields } = data;

    const requestPayload = {
      ...formFields,
      authToken: isSocialSignUp ? socialAuthInfo?.authToken : authToken,
      birth: `${year}-${month}-${day}`,
      mbti: `${EI}${NS}${FT}${JP}`,
      location: {
        latitude,
        longitude,
      },
    };

    const formData = new FormData();
    formData.append('registerRequestDto', JSON.stringify(requestPayload));
    formData.append('profileImage', imageUrl);

    mutate(formData);
  };

  const renderPage = () => {
    switch (signUpStep) {
      case 1:
        return <AuthForm />;
      case 2:
        return <BasicInfoForm />;
      case 3:
        return <AdditionalInfoForm />;
      default:
        return; // TO-DO: 에러 페이지 추가
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>{renderPage()}</form>
      </FormProvider>
    </>
  );
};

export default SignUpPage;
