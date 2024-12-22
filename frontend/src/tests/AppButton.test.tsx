import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppButton from '../components/ui/AppButton.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('AppButton', () => {
  it('should render with correct default classes', () => {
    render(<AppButton />);

    expect(screen.getByTestId('app-button')).toHaveClass('bg-transparent hover:bg-gray-100', 'py-1.5');
  });

  it('should render loading state', () => {
    render(<AppButton isLoading={true} />);

    expect(screen.getByTestId('app-button-loading')).toBeInTheDocument();
  });

  it('should render Link state', () => {
    render(
      <MemoryRouter>
        <AppButton
          to="/"
          text="test"
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('app-button-to')).toBeInTheDocument();
  });

  it('should render Link state with children', () => {
    render(
      <MemoryRouter>
        <AppButton to="/">test</AppButton>
      </MemoryRouter>
    );

    expect(screen.getByTestId('app-button-to')).toHaveTextContent('test');
  });

  it('should render children', () => {
    render(<AppButton>test</AppButton>);

    expect(screen.getByTestId('app-button')).toHaveTextContent('test');
  });

  it('should render text prop', () => {
    render(<AppButton text="test" />);

    expect(screen.getByTestId('app-button')).toHaveTextContent('test');
  });
});
