import { ChangeEvent } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  type: string;
  id: string;
  value: string;
  label: string;
  hasError: boolean;
  errorMessage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export const Input = ({
  type,
  id,
  value,
  label,
  hasError,
  errorMessage,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <div className={`${styles.field}`}>
      <div className={styles.info}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {hasError && <p className={styles.message}>{errorMessage}</p>}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${hasError ? styles.error : ''}`.trim()}
      />
    </div>
  );
};
