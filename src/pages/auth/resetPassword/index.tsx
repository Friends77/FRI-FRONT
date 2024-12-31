import EmailVerificationForm from '@/components/auth/Form/EmailVerificationForm';
import ResetPasswordForm from '@/components/auth/Form/ResetPasswordForm';
import resetPasswordStepAtom from '@/recoil/auth/resetPassword';
import { useRecoilValue } from 'recoil';
import * as Styled from './ResetPasswordPage.styled';

const ResetPasswordPage = () => {
  const resetPasswordStep = useRecoilValue(resetPasswordStepAtom);

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
    <Styled.Main>
      <Styled.Header>
        {resetPasswordStep === 1 ? '비밀번호 찾기' : '비밀번호 변경하기'}
      </Styled.Header>
      {renderPage()}
    </Styled.Main>
  );
};

export default ResetPasswordPage;
