import { TextareaHTMLAttributes } from 'react';
import styles from './inputs.module.scss';

interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const AppTextarea = ({ placeholder, error, autoFocus, onChange, value, name, ...otherProps }: AppTextareaProps) => {
  return (
    <div className="w-full">
      <textarea
        placeholder={placeholder}
        value={value}
        name={name}
        {...otherProps}
        className={styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default AppTextarea;
