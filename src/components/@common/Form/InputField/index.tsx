import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './InputField.styled';
import Cancel from '@/components/@common/SVG/Icon/Cancel';

export interface IInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력값의 타입을 지정 (default: text) */
  type: 'text' | 'password' | 'email' | 'tel' | 'number' | 'search' | 'url';
  /** 입력란의 이름 (폼에서 필드 이름으로 사용) */
  name: string;
  /** 입력란의 레이블 텍스트 */
  label?: string;
  /** 레이블의 색상을 지정하기 위한 색상 (default: Gray_800) */
  labelColor?: string;
  /** 레이블의 글씨 두께를 지정 (true: T2_B, false: B1_B) */
  boldLabel?: boolean;
  /** 입력란이 필수 값인지 확인 (기본값: false) */
  isRequired?: boolean;
  /** 입력란의 고유 id */
  id?: string;
  /** 입력 필드에 적용할 검증 규칙 */
  rules?: RegisterOptions;
  /** 입력란 너비 (기본값: 100%) */
  width?: string;
  /** 입력란 비활성화 여부 */
  disabled?: boolean;
  /** 에러 메시지의 위치를 설정 (absolute 또는 relative) */
  isErrorMsgRelative?: boolean;
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
  isErrorMsgRelative,
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

  const handleCancelClick = () => {
    setValue(name, '');
    setFocus(name);
  };

  return (
    <Styled.Wrapper $width={width}>
      {label && (
        <Styled.Label
          htmlFor={id}
          $bold={!!boldLabel}
          $isRequired={!!isRequired}
          $color={labelColor}
        >
          {label}
        </Styled.Label>
      )}
      <Styled.InputContainer $isErrorMsgRelative={isErrorMsgRelative}>
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
        {error && (
          <Styled.ErrorMsg $isErrorMsgRelative={isErrorMsgRelative}>
            {error.message}
          </Styled.ErrorMsg>
        )}
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};

export default InputField;
