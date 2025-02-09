import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserListItem from '../modules/users/components/UserListItem.tsx';
import { mockedUser } from './__mocks__/mocks.ts';

describe('UserListItem tests', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserListItem user={mockedUser} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });
});
