import { useInput } from "@/hooks/useInput";
import Button from "../Button/Button";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** label:  input 요소와 연관된 label의 htmlFor 속성에 할당될 값 */
  label?: string;
  /** id:  input 요소의 id를 설정하기 위한 값 */
  id?: string;
  /** change: input 값이 변경될 때 실행될 함수 */
  change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** description:  input 요소에 대한 추가적인 정보를 제공하기 위한 텍스트 */
  description?: string;
  /** buttonText:  버튼과 함께 사용하는 input 요소의 경우, 버튼에 표시될 텍스트 */
  buttonText?: string;
  /** buttonClick: 버튼과 함께 사용하는 input 요소의 경우, 버튼 클릭 시 실행될 이벤트 핸들러 함수 */
  buttonClick?: () => void;
  /** validate: input 값이 변경될 때마다 실행될 유효성 검증 함수 */
  validate?: (value: string) => boolean;
  /** disabledInput: input 요소의 비활성화 여부를 제어하는 property, default: false */
  disabledInput?: boolean;
  /** disabledButton: 버튼의 비활성화 여부를 제어하는 property, default: false */
  disabledButton?: boolean;
}

/**
 * @Input
 *  @사용목적
 *      1) 사용자 입력 수집
 *      2) 폼 요소 관리: 폼 내부에서 입력 필드로 활용하여 데이터의 유효성 검증, 제출 등과 연동 가능
 *      3) 재사용성 향상
 *  @주요기능
 *      1) 이벤트 핸들링
 *      2) 유효성 검증
 *      3) 필요에 따라 버튼과 함께 사용 가능
 */

const Input = ({
  label,
  id,
  change,
  description,
  buttonText,
  buttonClick,
  validate,
  disabledInput,
  disabledButton,
  ...rest
}: IInputProps) => {
  const {
    value,
    handleInputChange: inputChange,
    handleInputBlur,
    hasError,
  } = useInput("", validate ? (value: string) => validate(value) : () => true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChange(e);

    if (change) {
      change(e);
    }
  };
  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabledInput}
          {...rest}
        />
        {buttonText && (
          <Button
            type="button"
            text={buttonText}
            disable={hasError || disabledButton}
            onClick={buttonClick}
          />
        )}
      </div>
      {description && (
        <div>
          <p>{description}</p>
        </div>
      )}
    </>
  );
};

export default Input;
