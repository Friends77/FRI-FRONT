import Button from "@/components/@common/Button/Button";
import resetPasswordStepAtom from "@/recoil/auth/resetPassword";
import { moveToStep } from "@/utils/step/moveSteps";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import InputField from "../Input/InputField";
import { AUTH_ERROR_MSG } from "@/constants/message";
import { AUTH_PATTERN } from "@/constants/pattern";
import Timer from "../Timer/Timer";
import { useVerifyCode } from "@/hooks/auth/useVerifyCode";
import { useSendCodeToEmail } from "@/hooks/auth/useSendCodeToEmail";

const CODE_EXPIRATION_TIME = 180000;

const EmailVerificationForm = () => {
  const setResetPasswordStep = useSetRecoilState(resetPasswordStepAtom);
  const [isTimerActive, setIsTimerActive] = useState(false);
  // 이메일로 코드 전송을 성공하면 이후로는 수정하지 못하게 하기 위한 state
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isVerifed, setIsVerified] = useState(false);

  const {
    trigger,
    setError,
    watch,
    clearErrors,
    resetField,
    formState: { errors, isValid },
  } = useFormContext();

  const email = watch("email");

  const { mutate: sendCodeToEmail, isPending: isEmailSending } =
    useSendCodeToEmail({
      onSuccessHandler: () => {
        setIsTimerActive(true);
        setIsVerified(false);
        resetField("certno");
        setIsEmailSended(true);
      },
    });
  const handleSendEmail = async () => {
    const result = await trigger("email", { shouldFocus: true });

    // 인증 요청 전 유효성 검사
    if (!result) return;

    sendCodeToEmail(email);
  };

  const { mutate: verifyCode } = useVerifyCode({
    onSuccessHandler: () => {
      setIsTimerActive(false);
      setIsVerified(true);
      clearErrors("certno");
    },
    onErrorHandler: () => {
      setError("certno", {
        type: "manual",
        message: AUTH_ERROR_MSG.CERTNO_PATTERN,
      });
    },
  });

  useEffect(() => {
    if (errors.email) {
      clearErrors("email");
    }
  }, [email, errors]);
  return (
    <div>
      <InputField
        type="email"
        label="이메일 인증"
        id="email"
        name="email"
        disabled={isEmailSended}
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
        disabled={!email || !!errors.email || isEmailSending || isEmailSended}
      >
        인증 요청
      </Button>
      <InputField
        type="text"
        name="certno"
        placeholder={AUTH_ERROR_MSG.CERTNO_REQUIRED}
        maxLength={6}
        disabled={isVerifed}
        rules={{
          required: {
            value: true,
            message: AUTH_ERROR_MSG.CERTNO_REQUIRED,
          },
          validate: (value) => {
            if (value.length === 6) {
              try {
                verifyCode({ email, code: value });
                return true;
              } catch (error) {
                return AUTH_ERROR_MSG.CERTNO_PATTERN;
              }
            }
          },
        }}
      />
      {isTimerActive && (
        <Timer
          timeout={CODE_EXPIRATION_TIME}
          onTimeout={() => setIsTimerActive(false)}
        />
      )}
      {isVerifed && <p>인증에 성공하였습니다.</p>}
      <Button
        disabled={!isValid}
        onClick={() => moveToStep("next", setResetPasswordStep)}
      >
        다음
      </Button>
    </div>
  );
};

export default EmailVerificationForm;
