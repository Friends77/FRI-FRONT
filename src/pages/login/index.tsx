import { LoginDataType } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { AUTH_PATTERN } from "@/constants/pattern";
import { useLogin } from "@/hooks/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();
  const { mutate } = useLogin();

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
            required: "이메일을 입력해주세요.",
            pattern: {
              value: AUTH_PATTERN.EMAIL,
              message: "이메일 형식이 아닙니다.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        <button type="submit">제출</button>
      </form>
    </main>
  );
};

export default LoginPage;
