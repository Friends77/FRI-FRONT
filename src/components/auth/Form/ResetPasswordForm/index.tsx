import { AUTH_ERROR_MESSAGE } from '@/constants/message';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/components/@common/Form/InputField';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useRecoilValue } from 'recoil';
import emailAuthTokenAtom from '@/recoil/auth/emailAuthToken';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { ResetPasswordDataType } from '@/types/auth';
import * as Styled from './ResetPasswordForm.styled';

const ResetPasswordForm = () => {
  // emailAuthToken이 없는 경우 2단계(비밀번호 변경)로 넘어올 수 없기 때문에 string으로 타입 단언
  const emailAuthToken = useRecoilValue(emailAuthTokenAtom) as string;

  const methods = useForm<ResetPasswordDataType>({
    defaultValues: {
      password: '',
      'confirm-password': '',
    },
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const password = watch('password');

  const confirmPassword = watch('confirm-password');

  const { mutate } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordDataType> = (data) => {
    mutate({
      emailAuthToken,
      newPassword: data.password,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.PasswordContent>
          <InputField
            label="새 비밀번호"
            id="password"
            type="password"
            name="password"
            placeholder={AUTH_ERROR_MESSAGE.PASSWORD_REQUIRED}
            rules={{
              required: {
                value: true,
                message: AUTH_ERROR_MESSAGE.PASSWORD_REQUIRED,
              },
              minLength: {
                value: 8,
                message: AUTH_ERROR_MESSAGE.PASSWORD_PATTERN_MORE,
              },
              maxLength: {
                value: 20,
                message: AUTH_ERROR_MESSAGE.PASSWORD_PATTERN_BELOW,
              },
              pattern: {
                value: AUTH_PATTERN.PASSWORD,
                message: AUTH_ERROR_MESSAGE.PASSWORD_PATTERN,
              },
            }}
          />
          <InputField
            label="새 비밀번호 확인"
            id="confirm-password"
            type="password"
            name="confirm-password"
            placeholder={AUTH_ERROR_MESSAGE.PASSWORD_REQUIRED}
            rules={{
              required: true,
              validate: (value) => {
                if (value !== password) {
                  return AUTH_ERROR_MESSAGE.PASSWORD_NOT_MATCH;
                }
              },
            }}
          />
        </Styled.PasswordContent>
        <PrimaryButton
          type="submit"
          disabled={!!errors.password || password !== confirmPassword}
        >
          확인
        </PrimaryButton>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
