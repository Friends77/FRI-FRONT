import { signUp } from '@/apis/auth';
import AdditionalInfoForm from '@/components/auth/Form/AdditionalInfoForm';
import AuthForm from '@/components/auth/Form/AuthForm';
import BasicInfoForm from '@/components/auth/Form/BasicInfoForm';
import { AUTH_PATH } from '@/constants/routes';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import userLocationAtom from '@/recoil/auth/userLocation';
import { SignUpFormDataType } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

const SignUpPage = () => {
  const navigate = useNavigate();

  const { latitude, longitude } = useRecoilValue(userLocationAtom);
  const authToken = useRecoilValue(emailAuthTokenAtom) as string;

  // 회원가입 단계를 전역 상태로 관리
  const [signUpStep, setSignUpStep] = useRecoilState(signUpStepAtom);

  // 회원가입 페이지 이동 시, signUpStep 값을 1로 초기화
  useEffect(() => {
    setSignUpStep(1);
  }, []);

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
      alert('회원가입에 성공했어요.');
      navigate(AUTH_PATH.LOGIN);
    },
    onError: () => {
      alert('회원가입에 실패했어요.');
    },
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = (data) => {
    const {
      EI,
      NS,
      FT,
      JP,
      'confirm-password': _,
      certno,
      ...filteredData
    } = data;

    const formData = {
      ...filteredData,
      authToken,
      mbti: `${EI}${NS}${FT}${JP}`,
      imageUrl: '',
      location: {
        latitude,
        longitude,
      },
    };

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
