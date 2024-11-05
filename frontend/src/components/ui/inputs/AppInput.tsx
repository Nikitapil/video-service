import { InputHTMLAttributes } from 'react';
import styles from './inputs.module.scss';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  max?: number;
  label?: string;
}

const AppInput = ({
  placeholder,
  type,
  max,
  error,
  autoFocus,
  onChange,
  value,
  name,
  label,
  id,
  ...otherProps
}: AppInputProps) => {
  return (
    <div>
      {label && id && <label htmlFor={id}>{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        maxLength={max}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        {...otherProps}
        className={styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default AppInput;
