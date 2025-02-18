import EmailVerificationForm from '@/components/auth/Form/EmailVerificationForm';
import ResetPasswordForm from '@/components/auth/Form/ResetPasswordForm';
import * as Styled from './ResetPasswordPage.styled';
import { useState } from 'react';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);

  const handleNextStepClick = () => {
    setStep((prev) => prev + 1);
  };

  const renderPage = () => {
    switch (step) {
      case 1:
        return <EmailVerificationForm onNextStepClick={handleNextStepClick} />;
      case 2:
        return <ResetPasswordForm />;
      default:
        return; // TO-DO: 에러 페이지 추가
    }
  };

  return (
    <Styled.Main>
      <Styled.Header>
        {step === 1 ? '비밀번호 찾기' : '비밀번호 변경하기'}
      </Styled.Header>
      {renderPage()}
    </Styled.Main>
  );
};

export default ResetPasswordPage;
