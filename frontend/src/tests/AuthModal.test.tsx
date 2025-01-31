import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AuthModal from '../modules/shared/auth/components/AuthModal.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { LoginUserDocument, RegisterUserDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { GraphQLError } from 'graphql/error';
import * as helpers from '../modules/shared/auth/helpers.ts';

describe('AuthModal tests', () => {
  const setLoginData = () => {
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'test' } });
  };
  const setTestData = () => {
    setLoginData();
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('fullname'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('bio'), { target: { value: 'test' } });
  };

  it('should render sign in mode', () => {
    render(
      <MockedProvider mocks={[]}>
        <AuthModal />
      </MockedProvider>
    );

    expect(screen.getByTestId('auth-title').textContent).toBe('Sign in');
    expect(screen.getByTestId('change-mode-text').textContent).toBe("Don't have an account?");
    expect(screen.getByTestId('change-mode-btn').textContent).toBe('Sign up');
    expect(screen.getByTestId('submit-btn').textContent).toBe('Sign in');
  });

  it('should change mode to sign up', () => {
    render(
      <MockedProvider mocks={[]}>
        <AuthModal />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('change-mode-btn'));

    expect(screen.getByTestId('auth-title').textContent).toBe('Sign up');
    expect(screen.getByTestId('change-mode-text').textContent).toBe('Already have an account?');
    expect(screen.getByTestId('change-mode-btn').textContent).toBe('Sign in');
    expect(screen.getByTestId('submit-btn').textContent).toBe('Sign up');
  });

  it('should call handle register function', async () => {
    let isRegisterMutationCalled = false;

    const registerMutationMock = {
      request: {
        query: RegisterUserDocument,
        variables: {
          email: 'test',
          bio: 'test',
          password: 'test',
          confirmPassword: 'test',
          fullname: 'test',
          image: null
        }
      },
      result: () => {
        isRegisterMutationCalled = true;
        return {
          data: {
            register: {
              user: mockedUser
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[registerMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('change-mode-btn'));

    setTestData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(isRegisterMutationCalled).toBe(true));
  });

  it('should not set user if no user', async () => {
    const spy = vi.spyOn(helpers, 'setAccessToken');
    const registerMutationMock = {
      request: {
        query: RegisterUserDocument,
        variables: {
          email: 'test',
          bio: 'test',
          password: 'test',
          confirmPassword: 'test',
          fullname: 'test',
          image: null
        }
      },
      result: () => {
        return {
          data: {
            register: {
              user: null
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[registerMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('change-mode-btn'));

    setTestData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(spy).not.toHaveBeenCalled());
  });

  it('should set register errors correctly', async () => {
    const registerMutationMock = {
      request: {
        query: RegisterUserDocument,
        variables: {
          email: 'test',
          bio: 'test',
          password: 'test',
          confirmPassword: 'test',
          fullname: 'test',
          image: null
        }
      },
      result: {
        errors: [
          new GraphQLError('Error!', {
            extensions: {
              email: '123'
            }
          })
        ]
      }
    };

    render(
      <MockedProvider mocks={[registerMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('change-mode-btn'));

    setTestData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(screen.getByTestId('input-error')).toBeInTheDocument());
  });

  it('should handle login function correctly', async () => {
    let isLoginMutationCalled = false;
    const loginMutationMock = {
      request: {
        query: LoginUserDocument,
        variables: {
          email: 'test',
          password: 'test'
        }
      },
      result: () => {
        isLoginMutationCalled = true;
        return {
          data: {
            login: {
              user: mockedUser
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[loginMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    setLoginData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(isLoginMutationCalled).toBe(true));
  });

  it('should not set user if no user in response', async () => {
    const spy = vi.spyOn(helpers, 'setAccessToken');
    const loginMutationMock = {
      request: {
        query: LoginUserDocument,
        variables: {
          email: 'test',
          password: 'test'
        }
      },
      result: () => {
        return {
          data: {
            login: {
              user: null
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[loginMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    setLoginData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(spy).not.toHaveBeenCalled());
  });

  it('should set login errors correctly', async () => {
    const loginMutationMock = {
      request: {
        query: LoginUserDocument,
        variables: {
          email: 'test',
          password: 'test'
        }
      },
      result: {
        errors: [
          new GraphQLError('Error!', {
            extensions: {
              email: '123'
            }
          })
        ]
      }
    };

    render(
      <MockedProvider mocks={[loginMutationMock]}>
        <AuthModal />
      </MockedProvider>
    );

    setLoginData();

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(screen.getByTestId('input-error')).toBeInTheDocument());
  });
});
