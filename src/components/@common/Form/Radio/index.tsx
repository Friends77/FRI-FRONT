import { RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Radio.styled';

export interface IRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 라디오 버튼과 연결된 라벨 */
  label: string;
  /** 라디오 버튼의 고유 ID */
  id?: string;
  /** 폼에서 사용할 필드 이름 */
  name: string;
  /** react-hook-form의 유효성 검사 규칙 */
  rules?: RegisterOptions;
}

const Radio = ({ label, id, name, rules, ...rest }: IRadioProps) => {
  const { register } = useFormContext();

  return (
    <>
      <Styled.Label>
        <Styled.Radio
          type="radio"
          id={id}
          {...register(name, rules)}
          {...rest}
        />
        <Styled.CheckMark title="체크" width="16" height="16" />
        {label}
      </Styled.Label>
    </>
  );
};

export default Radio;
