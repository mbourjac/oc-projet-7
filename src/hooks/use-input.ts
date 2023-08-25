import { ChangeEvent, useState } from 'react';

type ValidationFunction = (value: string) => boolean;

interface ValidationRule {
  validate: ValidationFunction;
  errorMessage: string;
}

export const useInput = (validationRules?: ValidationRule[]) => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  let isValid = true;
  let errorMessage = '';

  if (validationRules) {
    isValid = validationRules.every((rule) => rule.validate(value));
    const errorRule = validationRules.find((rule) => !rule.validate(value));
    errorMessage = errorRule ? errorRule.errorMessage : '';
  }

  const hasError = !isValid && isTouched;

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleValueBlur = () => {
    setIsTouched(true);
  };

  return {
    value,
    isValid,
    hasError,
    errorMessage,
    handleValueChange,
    handleValueBlur,
  };
};
