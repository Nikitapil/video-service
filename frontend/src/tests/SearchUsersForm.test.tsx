import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchUsersForm from '../layouts/components/AppHeader/SearchUsersForm.tsx';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';

describe('SearchUsersForm tests', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: vi.fn(),
        useSearchParams: vi.fn(() => [new URLSearchParams('')]) // defaults to empty
      };
    });
  });

  it('should disable button if no search string', async () => {
    render(
      <MemoryRouter>
        <SearchUsersForm />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-user-button')).toBeDisabled();
  });

  it('should call navigate method', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <SearchUsersForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('search-user-input'), { target: { value: 'Change' } });

    fireEvent.click(screen.getByTestId('search-user-button'));

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should set initialSearch', async () => {
    (useSearchParams as any).mockReturnValue([new URLSearchParams('?search=existingValue')]);

    render(
      <MemoryRouter>
        <SearchUsersForm />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-user-input')).toHaveValue('existingValue');
  });
});
