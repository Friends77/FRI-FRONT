import { FieldError, RegisterOptions, useFormContext } from "react-hook-form";

export interface IInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const InputField = ({ label, id, name, rules, ...rest }: IInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...register(name, rules)} {...rest} />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputField;
