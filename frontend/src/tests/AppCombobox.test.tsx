import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AppCombobox from '../components/ui/inputs/AppCombobox.tsx';

describe('AppCombobox test', () => {
  it('initial render', () => {
    const mockFn = vi.fn();
    render(
      <AppCombobox
        onInputChange={mockFn}
        value=""
        setValue={mockFn}
        options={[]}
      />
    );
    expect(screen.getByTestId('app-combobox')).toBeInTheDocument();
  });

  it('should call change functions', () => {
    const inputHandler = vi.fn();
    const setValueHandler = vi.fn();

    render(
      <AppCombobox
        onInputChange={inputHandler}
        value=""
        setValue={setValueHandler}
        options={[]}
      />
    );

    const input = screen.getByTestId('app-combobox-input');

    fireEvent.change(input, { target: { value: 'Change' } });

    expect(inputHandler).toHaveBeenCalled();
    expect(setValueHandler).toHaveBeenCalled();
  });

  it('should show options container', () => {
    const inputHandler = vi.fn();
    const setValueHandler = vi.fn();

    render(
      <AppCombobox
        onInputChange={inputHandler}
        value=""
        setValue={setValueHandler}
        options={[{ value: '1', text: 'first' }]}
      />
    );

    const input = screen.getByTestId('app-combobox-input');

    fireEvent.focus(input);

    expect(screen.getByTestId('options-container')).toBeInTheDocument();
  });

  it('should trigger setValue on optionClick', () => {
    const inputHandler = vi.fn();
    const setValueHandler = vi.fn();

    render(
      <AppCombobox
        onInputChange={inputHandler}
        value="1"
        setValue={setValueHandler}
        options={[{ value: '1', text: 'first' }]}
      />
    );

    const input = screen.getByTestId('app-combobox-input');

    fireEvent.focus(input);

    const option = screen.getByRole('option');

    fireEvent.click(option);

    expect(setValueHandler).toHaveBeenCalledWith('1');
    waitFor(() => expect(screen.findByTestId('options-container')).not.toBeInTheDocument());
  });

  it('should close options by click outside', () => {
    const inputHandler = vi.fn();
    const setValueHandler = vi.fn();

    render(
      <AppCombobox
        onInputChange={inputHandler}
        value=""
        setValue={setValueHandler}
        options={[{ value: '1', text: 'first' }]}
      />
    );

    const input = screen.getByTestId('app-combobox-input');

    fireEvent.focus(input);

    fireEvent.click(document.body);
    waitFor(() => expect(screen.findByTestId('options-container')).not.toBeInTheDocument());
  });
});
