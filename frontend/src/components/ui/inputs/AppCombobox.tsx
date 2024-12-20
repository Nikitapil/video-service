import { useState, ChangeEvent, useEffect } from 'react';
import AppInput from './AppInput.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import { useClickOutside } from '../../../hooks/useClickOutside.ts';

interface IAppComboboxOption<T extends string | number> {
  value: T;
  text: string;
}

interface AppComboboxProps<T extends string | number> {
  onInputChange: (value: string) => void;
  value: T | null;
  setValue: (value: T | null) => void;
  options: IAppComboboxOption<T>[];
  placeholder?: string;
  disabled?: boolean;
}

const AppCombobox = <T extends string | number>({
  onInputChange,
  setValue,
  options,
  value,
  disabled,
  placeholder = ''
}: AppComboboxProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const { isShowed, open, close } = useShowElement();

  const { ref } = useClickOutside<HTMLDivElement>(close);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue } = e.target;
    setInputValue(targetValue);
    onInputChange(targetValue);
    setValue(null);
  };

  const handleChooseOption = (option: IAppComboboxOption<T>) => {
    setValue(option.value);
    close();
  };

  useEffect(() => {
    const currentOption = options.find((option) => option.value === value);
    if (currentOption) {
      setInputValue(currentOption.text);
    }
  }, [options, value]);

  return (
    <div
      ref={ref}
      className="relative w-full"
      data-testid="app-combobox"
    >
      <AppInput
        data-testid="app-combobox-input"
        value={inputValue}
        onChange={changeHandler}
        onFocus={open}
        placeholder={placeholder}
        disabled={disabled}
      />

      {isShowed && !!options.length && (
        <div
          className="absolute top-full z-40 max-h-52 w-full overflow-scroll rounded-md border bg-white"
          data-testid="options-container"
        >
          {options.map((option) => (
            <div
              className="cursor-pointer p-2 hover:bg-blue-100"
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              onClick={() => handleChooseOption(option)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppCombobox;
