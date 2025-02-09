import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GetUsersDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import UsersPage from '../modules/users/pages/Users/UsersPage.tsx';

describe('UsersPage tests', () => {
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }));
  Element.prototype.scrollTo = () => {};
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  it('renders correctly', async () => {
    const mock = {
      request: {
        query: GetUsersDocument,
        variables: {
          skip: 0,
          take: 10,
          search: ''
        }
      },
      result: {
        data: {
          getUsers: [mockedUser]
        }
      }
    };

    render(
      <MockedProvider mocks={[mock]}>
        <MemoryRouter>
          <UsersPage />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('users-list')).toBeInTheDocument());
  });
});
