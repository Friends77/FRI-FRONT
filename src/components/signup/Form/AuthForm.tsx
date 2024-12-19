import { useFormContext, useWatch } from "react-hook-form";
import InputField from "../Input/InputField";
import { useEffect, useState } from "react";
import Button from "@/components/@common/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { sendVerifyCode, sendVerifyEmail } from "@/apis/auth";
import Timer from "../Timer/Timer";

const AuthForm = () => {
  const [isTImerActive, setIsTimerActive] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const email = useWatch({ name: "email", control });
  const password = useWatch({ name: "password", control });
  const confirmPassword = useWatch({ name: "confirm-password", control });

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("confirm-password", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
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
  };

  // 인증 코드 일치 여부 검사
  const { mutate: sendCode } = useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: () => {
      alert("이메일 인증에 성공했어요!");
      setIsTimerActive(false);
    },
    onError: () => {
      alert("이메일 인증에 실패했어요.");
    },
  });

  return (
    <>
      <InputField
        type="email"
        label="이메일 인증"
        id="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        rules={{
          required: {
            value: true,
            message: "이메일은 필수 입력 사항입니다.",
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "이메일 형식이 올바르지 않습니다.",
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
        placeholder="인증코드를 입력해주세요"
        maxLength={6}
        rules={{
          required: {
            value: true,
            message: "인증코드를 입력해주세요.",
          },
          validate: (value) => {
            try {
              sendCode({ email, code: value });
              return true;
            } catch {
              return "인증코드가 올바르지 않습니다.";
            }
          },
        }}
      />
      {isTImerActive && (
        <Timer timeout={180000} onTimeout={() => setIsTimerActive(false)} />
      )}
      <InputField
        label="비밀번호"
        id="password"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        rules={{
          required: {
            value: true,
            message: "비밀번호는 필수 입력 사항입니다.",
          },
          minLength: {
            value: 8,
            message: "비밀번호는 8자 이상 입력해야 합니다.",
          },
          maxLength: {
            value: 20,
            message: "비밀번호는 20자 이하로 입력해야 합니다",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S{8,20}$).*/,
            message:
              "비밀번호는 공백을 제외하고 알파벳 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
          },
        }}
      />
      <InputField
        label="비밀번호 확인"
        id="confirm-password"
        type="password"
        name="confirm-password"
        placeholder="비밀번호를 입력해주세요"
        rules={{
          required: true,
          validate: (value) => {
            if (value !== password) {
              return "비밀번호가 일치하지 않습니다";
            }
          },
        }}
      />
    </>
  );
};

export default AuthForm;
