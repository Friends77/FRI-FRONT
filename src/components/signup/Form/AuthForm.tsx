import { sendVerifyCode, sendVerifyEmail } from "@/apis/auth";
import Button from "@/components/@common/Button/Button";
import { AUTH_PATTERN } from "@/constants/pattern";
import signUpStepAtom from "@/recoil/auth/signUp/atom";
import { moveToStep } from "@/utils/step/moveSteps";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { AUTH_ERROR_MSG } from "@/constants/message";
import Timer from "../Timer/Timer";
import InputField from "../Input/InputField";

const AuthForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isVerifedSuccess, setIsVerifiedSuccess] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isValid },
  } = useFormContext();

  const email = useWatch({ name: "email", control });
  const password = useWatch({ name: "password", control });
  const confirmPassword = useWatch({ name: "confirm-password", control });

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("confirm-password", {
        type: "manual",
        message: AUTH_ERROR_MSG.PASSWORD_NOT_MATCH,
      });
    } else {
      clearErrors("confirm-password");
    }
  }, [confirmPassword, password, setError, clearErrors]);

  // 사용자 이메일로 인증 코드 발송
  const { mutate: sendEmail, isPending: isEmailSending } = useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      alert("메일을 보냈어요! 메일함을 확인해주세요.");
      setIsTimerActive(true);
    },
    onError: () => {
      alert("이메일 발송에 실패했어요.");
    },
  });

  // 사용자 이메일로 인증 코드 발송
  const handleSendEmail = () => {
    sendEmail(email);
    setIsVerifiedSuccess(false);
    resetField("certno");
  };

  // 인증 코드 일치 여부 검사
  const { mutate: sendCode } = useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: () => {
      setIsTimerActive(false);
      setIsVerifiedSuccess(true);
      clearErrors("certno");
    },
    onError: () => {
      setError("certno", {
        type: "manual",
        message: AUTH_ERROR_MSG.CERTNO_PATTERN,
      });
    },
  });

  return (
    <>
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
      />
      <Button
        type="button"
        onClick={handleSendEmail}
        disabled={!email || !!errors.email || isEmailSending}
      >
        인증 요청
      </Button>
      <InputField
        type="text"
        name="certno"
        placeholder={AUTH_ERROR_MSG.CERTNO_REQUIRED}
        maxLength={6}
        disabled={isVerifedSuccess}
        rules={{
          required: {
            value: true,
            message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
          },
          validate: (value) => {
            if (value.length === 6) {
              try {
                sendCode({ email, code: value });
                return true;
              } catch (error) {
                return AUTH_ERROR_MSG.CERTNO_PATTERN;
              }
            }
          },
        }}
      />
      {isTimerActive && (
        <Timer timeout={180000} onTimeout={() => setIsTimerActive(false)} />
      )}
      {isVerifedSuccess && <p>인증에 성공하였습니다.</p>}
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
      />
      <Button
        disabled={!isValid}
        onClick={() => moveToStep("next", setSignUpStep)}
      >
        다음
      </Button>
    </>
  );
};

export default AuthForm;
