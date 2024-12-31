import Button from '@/components/@common/Button';
import resetPasswordStepAtom from '@/recoil/auth/resetPassword';
import { moveToStep } from '@/utils/step/moveSteps';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useVerifyCode } from '@/hooks/auth/useVerifyCode';
import { useSendCodeToEmail } from '@/hooks/auth/useSendCodeToEmail';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import InputField from '@/components/auth/Input';
import Timer from '@/components/auth/Timer';

const CODE_EXPIRATION_TIME = 180000;

const EmailVerificationForm = () => {
  const setResetPasswordStep = useSetRecoilState(resetPasswordStepAtom);
  const setEmailAuthToken = useSetRecoilState(emailAuthTokenAtom);
  const [isTimerActive, setIsTimerActive] = useState(false);
  // 이메일로 코드 전송을 성공하면 이후로는 수정하지 못하게 하기 위한 state
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeVerifed, setIsCodeVerified] = useState(false);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      certno: '',
    },
  });
  const {
    setError,
    watch,
    clearErrors,
    resetField,
    formState: { errors, isValid },
  } = methods;

  const email = watch('email');

  const { mutate: sendCodeToEmail, isPending: isEmailSending } =
    useSendCodeToEmail({
      onSuccessHandler: () => {
        setIsTimerActive(true);
        setIsCodeVerified(false);
        resetField('certno');
      },
      onErrorHandler: () => {
        setIsCodeSended(false);
      },
    });
  const handleSendEmail = async () => {
    setIsCodeSended(true);
    sendCodeToEmail(email);
  };

  const { mutateAsync: verifyCode } = useVerifyCode({
    onSuccessHandler: () => {
      setIsTimerActive(false);
      setIsCodeVerified(true);
      clearErrors('certno');
    },
    onErrorHandler: () => {
      setError('certno', {
        type: 'manual',
        message: AUTH_ERROR_MSG.CERTNO_PATTERN,
      });
    },
  });
  const handleVerifyCodeValidate = async (value: string) => {
    if (value.length === 6) {
      try {
        const { emailAuthToken } = await verifyCode({ email, code: value });
        setEmailAuthToken(emailAuthToken);
        return true;
      } catch (error) {
        return AUTH_ERROR_MSG.CERTNO_PATTERN;
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <form>
        <InputField
          type="email"
          label="이메일 인증"
          id="email"
          name="email"
          disabled={isCodeSended}
          placeholder={AUTH_ERROR_MSG.EMAIL_REQUIRED}
          rules={{
            required: {
              value: true,
              message: AUTH_ERROR_MSG.EMAIL_REQUIRED,
            },
            pattern: {
              value: AUTH_PATTERN.EMAIL,
              message: AUTH_ERROR_MSG.EMAIL_PATTERN,
            },
          }}
        />
        <Button
          type="button"
          onClick={handleSendEmail}
          disabled={!email || !!errors.email || isEmailSending || isCodeSended}
        >
          인증 요청
        </Button>
        <InputField
          type="text"
          name="certno"
          placeholder={AUTH_ERROR_MSG.CERTNO_REQUIRED}
          maxLength={6}
          disabled={isCodeVerifed || !isCodeSended}
          rules={{
            required: {
              value: true,
              message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
            },
            minLength: {
              value: 6,
              message: AUTH_ERROR_MSG.CERTNO_PATTERN,
            },
            validate: handleVerifyCodeValidate,
          }}
        />
        {isTimerActive && (
          <Timer
            timeout={CODE_EXPIRATION_TIME}
            onTimeout={() => setIsTimerActive(false)}
          />
        )}
        {isCodeVerifed && <p>인증에 성공하였습니다.</p>}
        <Button
          type="button"
          disabled={!isValid}
          onClick={() => moveToStep('next', setResetPasswordStep)}
        >
          다음
        </Button>
      </form>
    </FormProvider>
  );
};

export default EmailVerificationForm;
