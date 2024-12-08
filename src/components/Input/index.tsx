import { useInput } from '@/hooks/useInput';
import Button from '../Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blur?: () => boolean;
  isError?: boolean;
  error?: string;
  descrption?: string;
  buttonText?: string;
  buttonClick?: () => void;
  validate?: (value: string) => boolean;
}

export default function Input({
  label,
  id,
  change,
  blur,
  isError,
  error,
  descrption,
  buttonText,
  buttonClick,
  validate,
  ...props
}: InputProps) {
  const { value, handleInputChange, handleInputBlur, hasError } = useInput(
    '',
    validate ? (value) => validate(value) : () => true,
  );

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          value={value}
          onChange={(e) => {
            handleInputChange(e);
            change(e);
          }}
          onBlur={handleInputBlur}
          style={{ outline: 'none' }}
          {...props}
        />
        {buttonText && (
          <Button
            type="button"
            text={buttonText}
            disable={hasError}
            onClick={buttonClick}
          />
        )}
      </div>
      {descrption && (
        <div>
          <p style={{ fontSize: 12 }}>{descrption}</p>
        </div>
      )}
    </>
  );
}
