import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { useUserStore } from '../modules/shared/auth/stores/userStore.ts';
import ProtectedRoutes from '../modules/shared/auth/components/ProtectedRoutes.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { mockedUser } from './__mocks__/mocks.ts';

describe('ProtectedRoutes component tests', () => {
  it('should set loading state', () => {
    act(() => {
      useUserStore.setState({
        user: null,
        isAuthLoading: true
      });
    });

    render(
      <ProtectedRoutes>
        <div></div>
      </ProtectedRoutes>
    );

    expect(screen.getByTestId('protectedRoutes-loader')).toBeInTheDocument();
  });

  it('should render auth modal', () => {
    act(() => {
      useUserStore.setState({
        user: null,
        isAuthLoading: false
      });
    });

    render(
      <MockedProvider mocks={[]}>
        <ProtectedRoutes>
          <div></div>
        </ProtectedRoutes>
      </MockedProvider>
    );

    expect(screen.getByTestId('auth-title')).toBeInTheDocument();
  });

  it('should render children', () => {
    act(() => {
      useUserStore.setState({
        user: mockedUser,
        isAuthLoading: false
      });
    });

    render(
      <ProtectedRoutes>
        <div data-testid="test-div"></div>
      </ProtectedRoutes>
    );

    expect(screen.getByTestId('test-div')).toBeInTheDocument();
  });
});
