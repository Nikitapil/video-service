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
      {label && id && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        maxLength={maxLength}
        {...otherProps}
        className={styles.input}
      />
      {maxLength && <div className="text-right text-xs text-gray-500">{value.length}/80</div>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default AppTextarea;
