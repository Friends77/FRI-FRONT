import { RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Checkbox.styled';

export interface ICheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 체크박스와 연결된 라벨 */
  label: string;
  /** 체크박스의 고유 id */
  id?: string;
  /** 체크박스의 이름 (폼 제출 시 key 역할) */
  name: string;
  /** react-hook-form의 유효성 검사 규칙 */
  rules?: RegisterOptions;
}

const CheckBox = ({ label, id, name, rules, ...rest }: ICheckBoxProps) => {
  const { register } = useFormContext();

  return (
    <Styled.Label>
      <Styled.CheckBox
        type="checkbox"
        id={id}
        {...register(name, rules)}
        {...rest}
      />
      <Styled.CheckMark title="체크" width="16" height="16" />
      {label}
    </Styled.Label>
  );
};

export default CheckBox;
