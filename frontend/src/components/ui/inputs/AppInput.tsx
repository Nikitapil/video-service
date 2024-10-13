import { InputHTMLAttributes } from 'react';
import styles from './inputs.module.scss';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  max?: number;
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
  ...otherProps
}: AppInputProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={max}
        value={value}
        onChange={onChange}
        name={name}
        {...otherProps}
        className={styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default AppInput;
