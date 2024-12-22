import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AppForm from '../components/ui/AppForm.tsx';

describe('AppForm tests', () => {
  it('should call submit handler correctly', () => {
    const submitHandler = vi.fn();
    render(<AppForm onSubmit={submitHandler} />);

    const form = screen.getByTestId('app-form');

    fireEvent.submit(form);

    expect(submitHandler).toHaveBeenCalled();
  });
});
