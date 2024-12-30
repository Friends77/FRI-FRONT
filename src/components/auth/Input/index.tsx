import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Input.styled';
import Cancel from '@/components/@common/SVG/Icon/Cancel';

export interface IInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name: string;
  rules?: RegisterOptions;
  width?: string;
}

const InputField = ({
  label,
  id,
  name,
  rules,
  width,
  ...rest
}: IInputFieldProps) => {
  const {
    watch,
    setValue,
    setFocus,
    register,
    formState: { errors },
  } = useFormContext();

  const text = watch(name);
  const error = errors[name] as FieldError;

  const handleCancleClick = () => {
    setValue(name, '', { shouldValidate: true });
    setFocus(name);
  };
  return (
    <Styled.Wrapper $width={width}>
      <Styled.Label htmlFor={id}>{label}</Styled.Label>
      <Styled.InputContainer>
        <Styled.Input
          id={id}
          $isError={!!error}
          {...register(name, rules)}
          {...rest}
        />
        {text && (
          <Styled.CancelBtn type="button" onClick={handleCancleClick}>
            <Cancel title="취소" width="20" height="20" />
          </Styled.CancelBtn>
        )}
        {error && <Styled.ErrorMsg>{error.message}</Styled.ErrorMsg>}
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default InputField;
