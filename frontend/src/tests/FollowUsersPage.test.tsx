import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import FollowUsersPage from '../modules/users/pages/Users/FollowUsersPage.tsx';
import { UserFollowPagesTypesEnum } from '../router/routes.ts';
import { GetUsersDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';

describe('FollowUsersPage tests', () => {
  const userId = 123;

  it('renders Followers page', async () => {
    const getUsersMock = {
      request: {
        query: GetUsersDocument,
        variables: {
          userFollowers: userId,
          userFollowTo: null
        }
      },
      result: {
        data: {
          getUsers: [mockedUser]
        }
      }
    };

    render(
      <MockedProvider
        mocks={[getUsersMock]}
        addTypename={false}
      >
        <MemoryRouter initialEntries={[`/users/${userId}/${UserFollowPagesTypesEnum.FOLLOWERS}`]}>
          <Routes>
            <Route
              path="/users/:userId/:type"
              element={<FollowUsersPage />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('users-list')).toBeInTheDocument();
      expect(screen.getByTestId('title').textContent).toBe('Followers');
    });
  });

  it('renders Following page', async () => {
    const getUsersMock = {
      request: {
        query: GetUsersDocument,
        variables: {
          userFollowers: null,
          userFollowTo: userId
        }
      },
      result: {
        data: {
          getUsers: [mockedUser]
        }
      }
    };

    render(
      <MockedProvider
        mocks={[getUsersMock]}
        addTypename={false}
      >
        <MemoryRouter initialEntries={[`/users/${userId}/${UserFollowPagesTypesEnum.FOLLOWING}`]}>
          <Routes>
            <Route
              path="/users/:userId/:type"
              element={<FollowUsersPage />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('users-list')).toBeInTheDocument());
  });

  it('renders Following page with default userId', async () => {
    const getUsersMock = {
      request: {
        query: GetUsersDocument,
        variables: {
          userFollowers: null,
          userFollowTo: 0
        }
      },
      result: {
        data: {
          getUsers: [mockedUser]
        }
      }
    };

    render(
      <MockedProvider
        mocks={[getUsersMock]}
        addTypename={false}
      >
        <MemoryRouter initialEntries={[`/users/${UserFollowPagesTypesEnum.FOLLOWING}`]}>
          <Routes>
            <Route
              path="/users/:type"
              element={<FollowUsersPage />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('users-list')).toBeInTheDocument());
  });
});
