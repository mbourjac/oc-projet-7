import { ChangeEvent } from 'react';
import styles from './Input.module.scss';

type TextInputProps = {
  type: 'text';
};

type NumberInputProps = {
  type: 'number';
  min?: number;
  max?: number;
};

type InputProps = {
  id: string;
  value: string;
  label: string;
  required?: boolean;
  hasError: boolean;
  errorMessage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
} & (TextInputProps | NumberInputProps);

export const Input = ({
  id,
  label,
  hasError,
  errorMessage,
  ...attributes
}: InputProps) => {
  const inputAttributes = {
    id,
    className: `${styles.input} ${hasError ? styles.error : ''}`.trim(),
    ...attributes,
  };

  return (
    <div className={`${styles.field}`}>
      <div className={styles.info}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {hasError && <p className={styles.message}>{errorMessage}</p>}
      </div>
      <input {...inputAttributes} />
    </div>
  );
};
