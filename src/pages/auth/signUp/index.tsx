import AdditionalInfoForm from '@/components/auth/Form/AdditionalInfoForm';
import AuthForm from '@/components/auth/Form/AuthForm';
import BasicInfoForm from '@/components/auth/Form/BasicInfoForm';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { SignUpDataType } from '@/types/auth';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

const SignUpPage = () => {
  // 회원가입 단계를 전역 상태로 관리
  const [signUpStep] = useRecoilState(signUpStepAtom);

  const methods = useForm<SignUpDataType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      certno: '',
      password: '',
      'confirm-password': '',
      nickname: '',
      gender: '',
      EI: 'E',
      NS: 'N',
      FT: 'F',
      JP: 'J',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SignUpDataType> = (data) => {
    const mbti = `${data.EI}${data.NS}${data.FT}${data.JP}`;
    console.log(mbti);
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
