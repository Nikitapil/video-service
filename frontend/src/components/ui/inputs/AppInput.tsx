import { InputHTMLAttributes } from 'react';
import styles from './inputs.module.scss';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  max?: number;
  label?: string;
  value?: string;
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
      {label && id && (
        <label
          htmlFor={id}
          data-testid="input-label"
        >
          {label}
        </label>
      )}

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
      {max && (
        <div
          className="text-right text-xs text-gray-500"
          data-testid="input-max"
        >
          {value?.length}/{max}
        </div>
      )}
      {error && (
        <span
          className={styles.error}
          data-testid="input-error"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default AppInput;
