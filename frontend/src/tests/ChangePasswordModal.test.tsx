import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, fireEvent, waitFor } from '@testing-library/react';
import { useShowElement } from '../hooks/useShowElement.ts';
import ChangePasswordModal from '../modules/profile/components/ChangePasswordModal.tsx';
import { ChangePasswordDocument } from '../gql/graphql.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql/error';

describe('ChangePasswordModal tests', () => {
  it('should render correctly', async () => {
    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[]}>
        <ChangePasswordModal showElement={showElement.result.current} />
      </MockedProvider>
    );
    expect(screen.getByTestId('change-password-modal')).toBeInTheDocument();
  });

  it('should submit correctly', async () => {
    const showElement = renderHook(() => useShowElement(true));

    let isSubmitCalled = false;

    const changePasswordMutationMock = {
      request: {
        query: ChangePasswordDocument,
        variables: { oldPassword: '123', newPassword: '', confirmPassword: '' }
      },
      result: () => {
        isSubmitCalled = true;
        return {};
      }
    };

    render(
      <MockedProvider mocks={[changePasswordMutationMock]}>
        <ChangePasswordModal showElement={showElement.result.current} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('current-password-input'), { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(isSubmitCalled).toBe(true));
  });

  it('should set errors correctly', async () => {
    const showElement = renderHook(() => useShowElement(true));

    const changePasswordMutationMock = {
      request: {
        query: ChangePasswordDocument,
        variables: { oldPassword: '', newPassword: '', confirmPassword: '' }
      },
      result: {
        errors: [
          new GraphQLError('Error!', {
            extensions: {
              oldPassword: '123'
            }
          })
        ]
      }
    };

    render(
      <MockedProvider mocks={[changePasswordMutationMock]}>
        <ChangePasswordModal showElement={showElement.result.current} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => expect(screen.getByTestId('input-error')));
  });
});
