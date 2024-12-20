import { LoginDataType } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { AUTH_PATTERN } from "@/constants/pattern";
import { AUTH_ERROR_MSG } from "@/constants/message";
import { useLogin } from "@/hooks/auth/useLogin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginDataType>();

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
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: AUTH_ERROR_MSG.EMAIL_REQUIRED,
            pattern: {
              value: AUTH_PATTERN.EMAIL,
              message: AUTH_ERROR_MSG.EMAIL_PATTERN,
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: AUTH_ERROR_MSG.PASSWORD_REQUIRED,
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">제출</button>
      </form>
    </main>
  );
};

export default LoginPage;
