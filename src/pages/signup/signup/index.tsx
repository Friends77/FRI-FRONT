import { sendVerifyCode, sendVerifyEmail } from "@/apis/auth";
import Button from "@/components/@common/Button/Button";
import Input from "@/components/@common/Input/Input";
import Timer from "@/components/signup/Timer/Timer";
import signUpAtom from "@/recoil/signup";
import {
  validateCertNo,
  validateEmail,
  validateEmpty,
  validatePassword,
} from "@/utils/validation/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SignUpPage = () => {
  const [isCertNoSended, setIsCertNoSended] = useState(false);
  const [isVerifiedCode, setIsVerifyCode] = useState(false);
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  const setSignUpState = useSetRecoilState(signUpAtom);
  const signUpValue = useRecoilValue(signUpAtom);

  const { mutate: sendEmail, isPending: isEmailSending } = useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      alert("메일을 보냈어요! 메일함을 확인해주세요.");
      setIsCertNoSended(true);
    },
    onError: () => {
      alert("이메일 발송에 실패했어요.");
    },
  });

  const { mutate: sendCode, isSuccess: isCodeSuccess } = useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: () => {
      alert("이메일 인증에 성공했어요!");
      setIsVerifyCode(true);
    },
    onError: () => {
      alert("이메일 인증에 실패했어요.");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 사용자 이메일로 인증번호 발송
  const handleSendBtnClick = () => {
    sendEmail(signUpValue.email);
  };

  // 백엔드로 인증번호 발송
  const handleConfirmBtnClick = () => {
    sendCode({ email: signUpValue.email, code: signUpValue.certNo });
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      setPasswordsAreNotEqual(true);
      return;
    } else {
      setPasswordsAreNotEqual(false);
    }

    if (!validatePassword(data.password as string)) {
      return;
    }

    alert("프로필 작성 화면으로 이동합니다.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          id="email"
          name="email"
          validate={validateEmail}
          buttonText="인증번호 발송"
          buttonClick={handleSendBtnClick}
          required
          change={handleInputChange}
          disabledInput={isCodeSuccess}
          disabledButton={isEmailSending || isCodeSuccess}
        />
        {isCertNoSended && (
          <Input
            label="인증번호"
            type="text"
            id="certNo"
            name="certNo"
            validate={validateCertNo}
            buttonText="인증하기"
            buttonClick={handleConfirmBtnClick}
            maxLength={6}
            required
            change={handleInputChange}
            disabledInput={isCodeSuccess}
            disabledButton={isCodeSuccess || isVerifiedCode}
          />
        )}
        {isCertNoSended && !isVerifiedCode && (
          <Timer
            timeout={180000}
            onTimeout={() => {
              setIsVerifyCode(false);
            }}
          />
        )}
        <Input
          label="비밀번호"
          type="password"
          id="password"
          name="password"
          validate={validatePassword}
          required
          minLength={8}
          maxLength={20}
          change={handleInputChange}
          error={true}
          errorMsg="비밀번호는 8~20자 길이로 만들어주세요! 알파벳 소문자, 숫자, 특수문자를 각각 하나 이상 꼭 포함해야 해요 😊"
        />
        {passwordsAreNotEqual && <p>비밀번호가 일치하지 않습니다.</p>}
        <Input
          label="비밀번호 확인"
          type="password"
          id="confirm-password"
          name="confirm-password"
          validate={validatePassword}
          required
          minLength={8}
          maxLength={20}
          change={handleInputChange}
        />
        <Button
          disable={
            !validateEmpty(signUpValue.email) ||
            !validateEmpty(signUpValue.certNo) ||
            !validateEmpty(signUpValue.password) ||
            !validateEmpty(signUpValue["confirm-password"])
          }
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
