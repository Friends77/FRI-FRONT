import { useState } from 'react';

export function useInput(
  defaultValue: string,
  validationFn: (value: string) => boolean,
) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const [isDidEdit, setIsDidEdit] = useState(true);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
    setIsDidEdit(true);
  };

  const handleInputBlur = () => {
    setIsDidEdit(true);
  };

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError: isDidEdit && !valueIsValid,
  };
}
