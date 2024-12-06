import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  isError?: boolean;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, isError, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} {...props} />
        {isError && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  },
);

export default Input;
