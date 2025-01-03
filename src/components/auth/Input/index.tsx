import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Input.styled';
import Cancel from '@/components/@common/SVG/Icon/Cancel';

export interface IInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** label의 색상을 지정하기 위함 (default: Gray_800) */
  labelColor?: string;
  /** label의 typo 타입을 지정하기 위함 (true: T2_B, false: B1_B) */
  boldLabel?: boolean;
  /** input 요소가 필수값인지 확인하기 위함 */
  isRequired?: boolean;
  id?: string;
  name: string;
  rules?: RegisterOptions;
  /** 입력란 너비 */
  width?: string;
  disabled?: boolean;
}

const InputField = ({
  label,
  labelColor,
  boldLabel,
  isRequired,
  id,
  name,
  rules,
  width,
  disabled,
  ...rest
}: IInputFieldProps) => {
  const {
    watch,
    resetField,
    setFocus,
    register,
    formState: { errors },
  } = useFormContext();

  const text = watch(name);
  const error = errors[name] as FieldError;

  const handleCancelClick = () => {
    resetField(name);
    setFocus(name);
  };
  return (
    <Styled.Wrapper $width={width}>
      <Styled.Label
        htmlFor={id}
        $bold={!!boldLabel}
        $isRequired={!!isRequired}
        $color={labelColor}
      >
        {label}
      </Styled.Label>
      <Styled.InputContainer>
        <Styled.Input
          id={id}
          $isError={!!error}
          $text={text}
          disabled={disabled}
          {...register(name, rules)}
          {...rest}
        />
        {text && !disabled && (
          <Styled.CancelBtn type="button" onClick={handleCancelClick}>
            <Cancel title="취소" width="20" height="20" />
          </Styled.CancelBtn>
        )}
        {error && <Styled.ErrorMsg>{error.message}</Styled.ErrorMsg>}
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default InputField;
