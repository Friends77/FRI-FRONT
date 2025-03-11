import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import InputField from '@/components/@common/Form/InputField';
import Timer from '@/components/auth/Timer';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { moveToStep } from '@/utils/step/moveSteps';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import SecondaryButton from '@/components/@common/Button/SecondaryButton';
import { useCheckAvailability } from '@/hooks/auth/useCheckAvailability';
import { useSendCodeToEmail } from '@/hooks/auth/useSendCodeToEmail';
import { useVerifyCode } from '@/hooks/auth/useVerifyCode';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import * as Styled from './AuthForm.styled';

const AuthForm = () => {
  const setEmailAuthToken = useSetRecoilState(emailAuthTokenAtom);

  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  const [isTimerActive, setIsTimerActive] = useState(false);

  // 메일 발송 여부
  const [isSendedMail, setIsSendedMail] = useState(false);

  // 인증 성공 여부
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isValid },
  } = useFormContext();

  const email = useWatch({ name: 'email', control });

  const certno = useWatch({ name: 'certno', control });

  const password = useWatch({ name: 'password', control });

  const confirmPassword = useWatch({ name: 'confirm-password', control });

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError('confirm-password', {
        type: 'manual',
        message: AUTH_ERROR_MSG.PASSWORD_NOT_MATCH,
      });
    } else {
      clearErrors('confirm-password');
    }
  }, [confirmPassword, password, setError, clearErrors]);

  // 사용자 이메일로 인증 코드 발송
  const { mutate: sendEmail, isPending: isEmailSending } = useSendCodeToEmail({
    onSuccessHandler: () => {
      setIsSendedMail(true);
      setIsTimerActive(true);
      setIsVerifiedSuccess(false);
    },
    onErrorHandler: () => {
      setIsSendedMail(false);
    },
  });

  const handleSendEmail = async () => {
    sendEmail(email);
    setIsTimerActive(false);
    resetField('certno');
    setIsVerifiedSuccess(false);
  };

  // 서버로 사용자 입력 코드 발송
  const { mutateAsync: sendCode, isPending: isVerifying } = useVerifyCode({
    onSuccessHandler: () => {
      setIsTimerActive(false);
      setIsVerifiedSuccess(true);
      clearErrors('certno');
    },
    onErrorHandler: () => {
      setError('certno', {
        type: 'manual',
        message: AUTH_ERROR_MSG.CERTNO_PATTERN,
      });
    },
  });

  // 이메일 유효성 검사
  const { mutateAsync: verifyEmail } = useCheckAvailability();

  const handleVerifyEmailValidate = async (value: string) => {
    const { isValid, message } = await verifyEmail({ type: 'email', value });

    if (!isValid) {
      return message;
    }

    return true;
  };

  // 인증 코드 유효성 검사
  const handleVerifyCodeValidate = async (value: string) => {
    const { emailAuthToken } = await sendCode({ email, code: value });

    if (emailAuthToken) {
      setEmailAuthToken(emailAuthToken);

      return true;
    } else {
      return AUTH_ERROR_MSG.CERTNO_PATTERN;
    }
  };

  return (
    <Styled.AuthFormWrapper>
      <Styled.AuthFormHeader>회원가입</Styled.AuthFormHeader>
      <Styled.AuthFormContentSection>
        <Styled.AuthFormEmailSection>
          <Styled.AuthFormInputWithBtn>
            <InputField
              type="email"
              label="이메일 인증"
              id="email"
              name="email"
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
                validate: handleVerifyEmailValidate,
              }}
              width="210px"
              isErrorMsgRelative={true}
              boldLabel={true}
              labelColor="Gray_1000"
            />
            <Styled.AuthFormButtonContainer>
              <SecondaryButton
                type="button"
                onClick={handleSendEmail}
                disabled={!email || !!errors.email || isEmailSending}
              >
                {isSendedMail ? `재요청` : `인증 요청`}
              </SecondaryButton>
            </Styled.AuthFormButtonContainer>
          </Styled.AuthFormInputWithBtn>
          <Styled.AuthFormCertNoInputSection>
            {isSendedMail && (
              <InputField
                type="text"
                name="certno"
                placeholder={AUTH_ERROR_MSG.CERTNO_REQUIRED}
                maxLength={6}
                disabled={isVerifiedSuccess}
                rules={{
                  required: {
                    value: true,
                    message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
                  },
                  minLength: {
                    value: 6,
                    message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
                  },
                  maxLength: {
                    value: 6,
                    message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
                  },
                  validate: handleVerifyCodeValidate,
                }}
                boldLabel={true}
                labelColor="Gray_1000"
                isErrorMsgRelative={true}
              />
            )}
            {isTimerActive && (
              <Styled.Time $text={certno}>
                <Timer
                  timeout={180000}
                  onTimeout={() => setIsTimerActive(false)}
                />
              </Styled.Time>
            )}
          </Styled.AuthFormCertNoInputSection>
        </Styled.AuthFormEmailSection>
        <InputField
          label="비밀번호"
          id="password"
          type="password"
          name="password"
          placeholder={AUTH_ERROR_MSG.PASSWORD_REQUIRED}
          rules={{
            required: {
              value: true,
              message: AUTH_ERROR_MSG.PASSWORD_REQUIRED,
            },
            minLength: {
              value: 8,
              message: AUTH_ERROR_MSG.PASSWORD_PATTERN_MORE,
            },
            maxLength: {
              value: 20,
              message: AUTH_ERROR_MSG.PASSWORD_PATTERN_BELOW,
            },
            pattern: {
              value: AUTH_PATTERN.PASSWORD,
              message: AUTH_ERROR_MSG.PASSWORD_PATTERN,
            },
          }}
          boldLabel={true}
          isErrorMsgRelative={true}
          labelColor="Gray_1000"
        />
        <InputField
          label="비밀번호 확인"
          id="confirm-password"
          type="password"
          name="confirm-password"
          placeholder={AUTH_ERROR_MSG.PASSWORD_REQUIRED}
          rules={{
            required: true,
            validate: (value) => {
              if (value !== password) {
                return AUTH_ERROR_MSG.PASSWORD_NOT_MATCH;
              }
            },
          }}
          boldLabel={true}
          isErrorMsgRelative={true}
          labelColor="Gray_1000"
        />
        <PrimaryButton
          type="button"
          disabled={!isValid || isVerifying}
          onClick={() => moveToStep('next', setSignUpStep)}
        >
          다음
        </PrimaryButton>
      </Styled.AuthFormContentSection>
    </Styled.AuthFormWrapper>
  );
};

export default AuthForm;
