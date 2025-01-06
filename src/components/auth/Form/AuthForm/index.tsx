import { sendVerifyCode, sendVerifyEmail } from '@/apis/auth';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import { AUTH_PATTERN } from '@/constants/pattern';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { moveToStep } from '@/utils/step/moveSteps';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { AUTH_ERROR_MSG } from '@/constants/message';
import Timer from '@/components/auth/Timer';
import InputField from '@/components/auth/InputField';

import * as Styled from './AuthForm.styled';
import SecondaryButton from '@/components/@common/Button/SecondaryButton';

const AuthForm = () => {
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
  const { mutate: sendEmail, isPending: isEmailSending } = useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      setIsSendedMail(true);
      setIsTimerActive(true);
      alert('메일을 보냈어요! 메일함을 확인해주세요.');
    },
    onError: () => {
      alert('이메일 발송에 실패했어요.');
    },
  });

  // 사용자 이메일로 인증 코드 발송
  const handleSendEmail = () => {
    sendEmail(email);
    setIsVerifiedSuccess(false);
    resetField('certno');
  };

  // 인증 코드 일치 여부 검사
  const { mutate: sendCode, isPending: isVerifying } = useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: () => {
      setIsTimerActive(false);
      setIsVerifiedSuccess(true);
      clearErrors('certno');
    },
    onError: () => {
      setError('certno', {
        type: 'manual',
        message: AUTH_ERROR_MSG.CERTNO_PATTERN,
      });
    },
  });

  const handleVerifyCodeValidate = (value: string) => {
    if (value.length === 6) {
      try {
        sendCode({ email, code: value });
        return true;
      } catch (error) {
        return AUTH_ERROR_MSG.CERTNO_PATTERN;
      }
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
                인증 요청
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
