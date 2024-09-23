import { InputHTMLAttributes } from 'react';

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
        className="common-transition block w-full rounded-md border border-gray-300 bg-indigo-50 px-3 py-2.5 text-gray-900 outline-none focus:bg-white"
      />
      {error && <span className="text-sm font-semibold text-red-500">{error}</span>}
    </div>
  );
};

export default AppInput;
