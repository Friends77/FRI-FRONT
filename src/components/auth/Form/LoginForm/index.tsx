import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useLogin } from '@/hooks/auth/useLogin';
import { LoginDataType } from '@/types/auth';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/components/auth/Input';

const LoginForm = () => {
  const methods = useForm<LoginDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, setError } = methods;

  const { mutate } = useLogin({
    loginErrorHandler: () => {
      setError(
        'password',
        { message: AUTH_ERROR_MSG.INCORRECT_EMAIL_OR_PASSWORD },
        { shouldFocus: true },
      );
    },
  });

  const onSubmit: SubmitHandler<LoginDataType> = (data) => {
    mutate(data);
  };

  return (
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
  );
};

export default LoginForm;
