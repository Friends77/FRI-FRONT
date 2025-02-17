import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useVerifyCode } from '@/hooks/auth/useVerifyCode';
import { useSendCodeToEmail } from '@/hooks/auth/useSendCodeToEmail';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import InputField from '@/components/auth/InputField';
import Timer from '@/components/auth/Timer';
import * as Styled from './EmailVerificationForm.styled';

const CODE_EXPIRATION_TIME = 180000;

interface IEmailVerificationFormProps {
  onNextStepClick: () => void;
}

const EmailVerificationForm = ({
  onNextStepClick,
}: IEmailVerificationFormProps) => {
  const setEmailAuthToken = useSetRecoilState(emailAuthTokenAtom);

  const [isTimerActive, setIsTimerActive] = useState(false);

  // 이메일로 코드 전송을 성공하면 이후로는 수정하지 못하게 하기 위한 state
  const [isCodeSended, setIsCodeSended] = useState(false);

  const [isCodeVerified, setIsCodeVerified] = useState(false);

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

  const certno = watch('certno');

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
      } catch (_) {
        return AUTH_ERROR_MSG.CERTNO_PATTERN;
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Styled.SendCodeContent>
          <InputField
            type="email"
            label="이메일 인증"
            boldLabel
            id="email"
            name="email"
            width="210px"
            disabled={isCodeSended}
            placeholder={AUTH_ERROR_MSG.EMAIL_REQUIRED}
            isErrorMsgRelative
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
          <Styled.SendCodeBtn
            type="button"
            onClick={handleSendEmail}
            disabled={
              !email || !!errors.email || isEmailSending || isCodeSended
            }
          >
            인증 요청
          </Styled.SendCodeBtn>
        </Styled.SendCodeContent>
        <Styled.CodeContent>
          <InputField
            type="text"
            name="certno"
            placeholder={AUTH_ERROR_MSG.CERTNO_REQUIRED}
            maxLength={6}
            disabled={isCodeVerified || !isCodeSended}
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
            <Styled.Time $text={certno}>
              <Timer
                timeout={CODE_EXPIRATION_TIME}
                onTimeout={() => setIsTimerActive(false)}
              />
            </Styled.Time>
          )}
        </Styled.CodeContent>
        <PrimaryButton
          type="button"
          disabled={!isValid}
          onClick={onNextStepClick}
        >
          다음
        </PrimaryButton>
      </form>
    </FormProvider>
  );
};

export default EmailVerificationForm;
