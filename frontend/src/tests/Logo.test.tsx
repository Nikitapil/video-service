import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from '../components/Logo.tsx';

describe('Logo Component tests', () => {
  it('should render logo with correct text class', () => {
    render(<Logo textClassName="test" />);

    expect(screen.getByTestId('logo-text')).toHaveClass('test');
  });

  it('should render logo with default classes', () => {
    render(<Logo />);

    expect(screen.getByTestId('logo-text').className).toBe('text-lg text-black ');
  });
});
