import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsersList from '../modules/users/components/UsersList.tsx';
import { mockedUser } from './__mocks__/mocks.ts';

describe('UsersList tests', () => {
  it('renders loading', () => {
    render(
      <MemoryRouter>
        <UsersList isLoading={true} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('users-list-loading')).toBeInTheDocument();
  });

  it('renders empty text', () => {
    render(
      <MemoryRouter>
        <UsersList isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-text')).toBeInTheDocument();
  });

  it('renders users list', () => {
    render(
      <MemoryRouter>
        <UsersList
          isLoading={false}
          users={[mockedUser]}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('users-list')).toBeInTheDocument();
  });
});
