import AuthForm from "@/components/auth/Form/AuthForm";
import ProfileForm from "@/components/auth/Form/ProfileForm";
import signUpStepAtom from "@/recoil/auth/signUp/atom";
import { SignUpDataType } from "@/types/auth";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

const SignUpPage = () => {
  // 회원가입 단계를 전역 상태로 관리
  const [signUpStep] = useRecoilState(signUpStepAtom);

  const methods = useForm<SignUpDataType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      certno: "",
      password: "",
      "confirm-password": "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderPage = () => {
    switch (signUpStep) {
      case 1:
        return <AuthForm />;
      case 2:
        return <ProfileForm />;
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
