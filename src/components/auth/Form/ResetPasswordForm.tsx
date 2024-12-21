import { AUTH_ERROR_MSG } from "@/constants/message";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../Input/InputField";
import { AUTH_PATTERN } from "@/constants/pattern";
import { useRecoilValue } from "recoil";
import emailAuthTokenAtom from "@/recoil/auth/emailAuthToken";
import Button from "@/components/@common/Button/Button";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

const ResetPasswordForm = () => {
  // emailAuthToken이 없는 경우 2단계(비밀번호 변경)로 넘어올 수 없기 때문에 string으로 타입 단언
  const emailAuthToken = useRecoilValue(emailAuthTokenAtom) as string;
  const { watch, setError, clearErrors } = useFormContext();

  const password = watch("password");
  const confirmPassword = watch("confirm-password");
  const isPasswordEqual = password === confirmPassword;

  const { mutate } = useResetPassword();
  const handleResetClick = () => {
    mutate({ emailAuthToken, newPassword: password });
  };

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (confirmPassword && !isPasswordEqual) {
      setError("confirm-password", {
        type: "manual",
        message: AUTH_ERROR_MSG.PASSWORD_NOT_MATCH,
      });
    } else {
      clearErrors("confirm-password");
    }
  }, [confirmPassword, password, setError, clearErrors]);
  return (
    <>
      <InputField
        label="새 비밀번호"
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
        label="새 비밀번호 확인"
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
        type="button"
        disabled={!isPasswordEqual}
        onClick={handleResetClick}
      >
        확인
      </Button>
    </>
  );
};

export default ResetPasswordForm;
