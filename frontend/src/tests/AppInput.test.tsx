import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppInput from '../components/ui/inputs/AppInput.tsx';

describe('AppInput', () => {
  const mockFn = vi.fn();

  it('Should render input with label', () => {
    render(
      <AppInput
        id="id"
        label="label"
        onChange={mockFn}
      />
    );

    expect(screen.getByTestId('input-label')).toHaveTextContent('label');
  });

  it('Should render max label', () => {
    render(
      <AppInput
        max={10}
        value="a"
        onChange={mockFn}
      />
    );

    expect(screen.getByTestId('input-max')).toHaveTextContent('1/10');
  });

  it('Should render error label', () => {
    render(<AppInput error="error" />);

    expect(screen.getByTestId('input-error')).toHaveTextContent('error');
  });
});
