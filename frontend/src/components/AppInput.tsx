import {InputHTMLAttributes, useEffect, useRef} from "react";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string,
  max?: number
}

const AppInput = ({ placeholder, type, max, error, autoFocus, onChange, value, name, ...otherProps }: AppInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // TODO check this useEffect, if input native autofocus works remove this useless effect
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        maxLength={max}
        value={value}
        onChange={onChange}
        name={name}
        {...otherProps}
        className="block w-full bg-[#F0F0F0] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 outline-none focus:bg-white transition-all duration-300"
      />
      {error && <span className="text-red-500 text-[14px] font-semibold">{error}</span>}
    </div>
  );
};

export default AppInput;