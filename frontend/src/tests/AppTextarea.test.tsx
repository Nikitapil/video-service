import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppTextarea from '../components/ui/inputs/AppTextarea.tsx';

describe('AppTextarea', () => {
  it('should should render textarea with label', () => {
    render(
      <AppTextarea
        value="value"
        label="label"
        id="id"
      />
    );

    expect(screen.getByTestId('textarea-input')).toHaveTextContent('label');
  });

  it('Should render max label', () => {
    render(
      <AppTextarea
        maxLength={10}
        value="a"
      />
    );

    expect(screen.getByTestId('input-max')).toHaveTextContent('1/10');
  });

  it('Should render error label', () => {
    render(
      <AppTextarea
        value="a"
        error="error"
      />
    );

    expect(screen.getByTestId('input-error')).toHaveTextContent('error');
  });
});
