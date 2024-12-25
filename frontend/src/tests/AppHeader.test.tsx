import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AppHeader from '../layouts/components/AppHeader/AppHeader.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { useUserStore } from '../modules/shared/auth/stores/userStore.ts';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LogoutUserDocument } from '../gql/graphql.tsx';

describe('AppHeader tests', () => {
  it('should not render header without user', async () => {
    render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <AppHeader />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByTestId('app-header')).not.toBeInTheDocument());
  });

  it('should render header with user', async () => {
    act(() => {
      useUserStore.setState({
        user: {
          email: 'test@test.com',
          fullname: 'testName',
          id: 123
        }
      });
    });
    render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <MemoryRouter>
          <AppHeader />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.findByTestId('app-header')).resolves.toBeInTheDocument());
  });

  it('should call logout', async () => {
    const logoutSpy = vi.spyOn(useUserStore.getState(), 'logout');
    act(() => {
      useUserStore.setState({
        user: {
          email: 'test@test.com',
          fullname: 'testName',
          id: 123
        }
      });
    });
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: LogoutUserDocument
            },
            result: {
              data: {
                message: 'Success'
              }
            }
          }
        ]}
        addTypename={false}
      >
        <MemoryRouter>
          <AppHeader />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('profile-btn'));

    fireEvent.click(screen.getByTestId('logout-btn'));

    fireEvent.click(screen.getByTestId('modal-confirm-btn'));

    await waitFor(() => expect(logoutSpy).toHaveBeenCalled());
  });
});
