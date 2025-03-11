import { AUTH_ERROR_MSG } from '@/constants/message';
import { useLogin } from '@/hooks/auth/useLogin';
import { LoginDataType } from '@/types/auth';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/components/auth/InputField';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import * as Styled from './LoginForm.styled';
import { AUTH_PATTERN } from '@/constants/pattern';

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
      <Styled.LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <Styled.InputFields>
          <InputField
            type="email"
            label="이메일"
            id="email"
            name="email"
            placeholder={AUTH_ERROR_MSG.EMAIL_REQUIRED}
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
            placeholder={AUTH_ERROR_MSG.PASSWORD_REQUIRED}
            rules={{
              required: AUTH_ERROR_MSG.PASSWORD_REQUIRED,
            }}
          />
        </Styled.InputFields>
        <PrimaryButton type="submit">로그인</PrimaryButton>
      </Styled.LoginForm>
    </FormProvider>
  );
};

export default LoginForm;
