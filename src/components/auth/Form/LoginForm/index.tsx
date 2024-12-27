import { AUTH_ERROR_MSG } from "@/constants/message";
import { AUTH_PATTERN } from "@/constants/pattern";
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginDataType } from "@/types/auth";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/auth/Input";
import { useGoogleLogin } from "@react-oauth/google";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";
import { useId } from "react";

const LoginForm = () => {
  const stateId = useId();

  const methods = useForm<LoginDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const { mutate } = useLogin({
    loginErrorHandler: () => {
      setError(
        "password",
        { message: AUTH_ERROR_MSG.INCORRECT_EMAIL_OR_PASSWORD },
        { shouldFocus: true }
      );
    },
  });

  const onSubmit: SubmitHandler<LoginDataType> = (data) => {
    mutate(data);
  };

  const { mutate: sendSocialToken } = useSocialLogin({ socialType: "GOOGLE" });

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      sendSocialToken({
        code: tokenResponse.code,
        provider: "GOOGLE",
      });
    },
  });

  const handleNaverLogin = () => {
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const naverCallbackURL = import.meta.env.VITE_NAVER_CALLBACK_URL;
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${stateId}&redirect_uri=${naverCallbackURL}`;

    window.location.href = naverLoginUrl;
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            type="email"
            label="이메일"
            id="email"
            name="email"
            placeholder="이메일"
            rules={{
              required: AUTH_ERROR_MSG.EMAIL_REQUIRED,
              pattern: {
                value: AUTH_PATTERN.EMAIL,
                message: AUTH_ERROR_MSG.EMAIL_PATTERN,
              },
            }}
          />
          <InputField
            type="password"
            label="비밀번호"
            id="password"
            name="password"
            placeholder="비밀번호"
            rules={{
              required: AUTH_ERROR_MSG.PASSWORD_REQUIRED,
            }}
          />
          <button type="submit">로그인</button>
        </form>
      </FormProvider>
      <button type="button" onClick={handleGoogleLogin}>
        구글 로그인
      </button>
      <button type="button" onClick={handleNaverLogin}>
        네이버 로그인
      </button>
    </>
  );
};

export default LoginForm;
