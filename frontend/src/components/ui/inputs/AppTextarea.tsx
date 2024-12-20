import { TextareaHTMLAttributes } from 'react';
import styles from './inputs.module.scss';

interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  value: string;
  label?: string;
}

const AppTextarea = ({ placeholder, error, value, name, maxLength, label, id, ...otherProps }: AppTextareaProps) => {
  return (
    <div className="w-full">
      {label && id && (
        <label
          htmlFor={id}
          data-testid="textarea-input"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        maxLength={maxLength}
        {...otherProps}
        className={styles.input}
      />
      {maxLength && (
        <div
          className="text-right text-xs text-gray-500"
          data-testid="input-max"
        >
          {value.length}/{maxLength}
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

export default AppTextarea;
