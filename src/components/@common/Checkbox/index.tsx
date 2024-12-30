import { RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Checkbox.styled';

export interface ICheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const CheckBox = ({ text, id, name, rules, ...rest }: ICheckBoxProps) => {
  const { register } = useFormContext();
  return (
    <Styled.Label>
      <Styled.CheckBox
        type="checkbox"
        id={id}
        {...register(name, rules)}
        {...rest}
      />
      {text}
    </Styled.Label>
  );
};

export default CheckBox;
