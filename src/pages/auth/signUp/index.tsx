import AdditionalInfoForm from '@/components/auth/Form/AdditionalInfoForm';
import AuthForm from '@/components/auth/Form/AuthForm';
import BasicInfoForm from '@/components/auth/Form/BasicInfoForm';
import { AUTH_CONSTANTS } from '@/constants/auth';
import { ROOT_PATH } from '@/constants/routes';
import useSignUp from '@/hooks/auth/useSignUp';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import signUpStepAtom from '@/recoil/auth/signUpStep/atom';
import socialAuthInfoAtom from '@/recoil/auth/socialLogin';
import userLocationAtom from '@/recoil/auth/userLocation';
import { Gender } from '@/types/@common';
import { SignUpFormDataType } from '@/types/auth';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

const SignUpPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROOT_PATH.ROOT);
    }
  }, [navigate, isLoggedIn]);

  const [searchParams] = useSearchParams();

  const isSocialSignUp = searchParams.get('social') === 'true';

  const [signUpStep, setSignUpStep] = useRecoilState(signUpStepAtom);

  useEffect(() => {
    if (!isSocialSignUp) {
      setSignUpStep(AUTH_CONSTANTS.SIGN_UP_STEP);
    }
  }, [isSocialSignUp, setSignUpStep]);

  const { latitude, longitude } = useRecoilValue(userLocationAtom);

  const authToken = useRecoilValue(emailAuthTokenAtom) as string;

  const socialAuthInfo = useRecoilValue(socialAuthInfoAtom);

  const methods = useForm<SignUpFormDataType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      certno: '',
      password: '',
      'confirm-password': '',
      nickname: '',
      gender: Gender.MAN,
      EI: 'E',
      NS: 'N',
      FT: 'F',
      JP: 'J',
    },
  });

  const { handleSubmit } = methods;

  const { mutate: signUp } = useSignUp();

  const onSubmit: SubmitHandler<SignUpFormDataType> = (data) => {
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

    signUp(formData);
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
        return <AuthForm />;
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
