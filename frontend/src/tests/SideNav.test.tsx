import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import SideNav from '../layouts/main/components/SideNav/SideNav.tsx';
import { GetSuggestedUsersDocument } from '../gql/graphql.tsx';

describe('SideNav tests', () => {
  it('render loader for users', () => {
    render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <MemoryRouter>
          <SideNav />
        </MemoryRouter>
      </MockedProvider>
    );
    waitFor(() => expect(screen.getByTestId('nav-loading')).toBeInTheDocument());
  });

  it('render loader for users', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GetSuggestedUsersDocument
            },
            result: {
              data: {
                getUsers: [
                  {
                    id: 123,
                    fullname: 'test user',
                    email: 'test@test.test',
                    bio: 'test bio'
                  }
                ]
              }
            }
          }
        ]}
        addTypename={false}
      >
        <MemoryRouter>
          <SideNav />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitFor(() => expect(screen.getByTestId('suggested-users')).toBeInTheDocument());
  });

  it('render show more btn', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GetSuggestedUsersDocument
            },
            result: {
              data: {
                getUsers: [
                  {
                    id: 123,
                    fullname: 'test user',
                    email: 'test@test.test',
                    bio: 'test bio'
                  },
                  {
                    id: 124,
                    fullname: 'test user',
                    email: 'test@test.test',
                    bio: 'test bio'
                  },
                  {
                    id: 125,
                    fullname: 'test user',
                    email: 'test@test.test',
                    bio: 'test bio'
                  },
                  {
                    id: 126,
                    fullname: 'test user',
                    email: 'test@test.test',
                    bio: 'test bio'
                  }
                ]
              }
            }
          }
        ]}
        addTypename={false}
      >
        <MemoryRouter>
          <SideNav />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('nav-show-more-btn')).toBeInTheDocument());

    const btn = screen.getByTestId('nav-show-more-btn');
    fireEvent.click(btn);

    expect(screen.getAllByTestId('suggested-users').length).toBe(4);
  });
});
