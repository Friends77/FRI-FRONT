import { RegisterOptions, useFormContext } from 'react-hook-form';
import * as Styled from './Radio.styled';

export interface IRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const Radio = ({ text, id, name, rules, ...rest }: IRadioProps) => {
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
        {text}
      </Styled.Label>
    </>
  );
};

export default Radio;
