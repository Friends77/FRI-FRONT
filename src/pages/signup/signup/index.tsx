import Button from "@/components/@common/Button/Button";
import AuthForm from "@/components/signup/Form/AuthForm";
import ProfileForm from "@/components/signup/Form/ProfileForm";
import signUpStepAtom from "@/recoil/signup/atom";
import { SignUpDataType } from "@/types/auth";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

const SignUpPage = () => {
  // 회원가입 단계를 전역 상태로 관리
  const [signUpStep, setSignUpStep] = useRecoilState(signUpStepAtom);

  // 다음 단계
  const handleNextStep = () => {
    setSignUpStep((prevStep) => {
      return ++prevStep;
    });
  };

  const methods = useForm<SignUpDataType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      certno: "",
      password: "",
      "confirm-password": "",
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const renderPage = () => {
    switch (signUpStep) {
      case 1:
        return (
          <>
            <AuthForm />
            <Button disabled={!isValid} onClick={handleNextStep}>
              다음
            </Button>
          </>
        );
      case 2:
        return <ProfileForm />;
      default:
        return; // TO-DO: 에러 페이지 추가
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form>{renderPage()}</form>
      </FormProvider>
    </>
  );
};

export default SignUpPage;
