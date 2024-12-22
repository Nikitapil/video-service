import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppTextarea from '../components/ui/inputs/AppTextarea.tsx';

describe('AppTextarea', () => {
  const mockFn = vi.fn();

  it('should should render textarea with label', () => {
    render(
      <AppTextarea
        value="value"
        label="label"
        id="id"
        onChange={mockFn}
      />
    );

    expect(screen.getByTestId('textarea-input')).toHaveTextContent('label');
  });

  it('Should render max label', () => {
    render(
      <AppTextarea
        maxLength={10}
        value="a"
        onChange={mockFn}
      />
    );

    expect(screen.getByTestId('input-max')).toHaveTextContent('1/10');
  });

  it('Should render error label', () => {
    render(
      <AppTextarea
        value="a"
        error="error"
        onChange={mockFn}
      />
    );

    expect(screen.getByTestId('input-error')).toHaveTextContent('error');
  });
});
