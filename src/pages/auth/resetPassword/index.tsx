import EmailVerificationForm from "@/components/auth/Form/EmailVerificationForm";
import ResetPasswordForm from "@/components/auth/Form/ResetPasswordForm";
import resetPasswordStepAtom from "@/recoil/auth/resetPassword";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

const ResetPasswordPage = () => {
  const resetPasswordStep = useRecoilValue(resetPasswordStepAtom);
  const methods = useForm({
    defaultValues: {
      email: "",
      certno: "",
    },
  });

  const renderPage = () => {
    switch (resetPasswordStep) {
      case 1:
        return <EmailVerificationForm />;
      case 2:
        return <ResetPasswordForm />;
      default:
        return; // TO-DO: 에러 페이지 추가
    }
  };
  return (
    <main>
      <FormProvider {...methods}>{renderPage()}</FormProvider>
    </main>
  );
};

export default ResetPasswordPage;
