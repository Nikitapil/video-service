import { describe, it, expect } from 'vitest';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import EditProfileModal from '../modules/profile/components/EditProfileModal.tsx';
import { useShowElement } from '../hooks/useShowElement.ts';
import { UpdateUserProfileDocument } from '../gql/graphql.tsx';
import { GraphQLError } from 'graphql/error';

describe('EditProfileModal tests', () => {
  it('should render correctly', () => {
    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[]}>
        <EditProfileModal showElement={showElement.result.current} />
      </MockedProvider>
    );
    expect(screen.getByTestId('edit-profile-modal'));
  });

  it('should call update profile method', async () => {
    const showElement = renderHook(() => useShowElement(true));

    let isUpdateProfileCalled = false;

    const updateProfileModalMock = {
      request: {
        query: UpdateUserProfileDocument,
        variables: {
          fullname: 'username',
          bio: 'bio',
          email: 'email'
        }
      },
      result: () => {
        isUpdateProfileCalled = true;
        return {};
      }
    };

    render(
      <MockedProvider mocks={[updateProfileModalMock]}>
        <EditProfileModal showElement={showElement.result.current} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'username' } });
    fireEvent.change(screen.getByTestId('bio-input'), { target: { value: 'bio' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'email' } });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => expect(isUpdateProfileCalled).toBe(true));
  });

  it('should set errors correctly', async () => {
    const showElement = renderHook(() => useShowElement(true));

    const updateProfileModalMock = {
      request: {
        query: UpdateUserProfileDocument,
        variables: {
          fullname: '',
          bio: '',
          email: ''
        }
      },
      result: {
        errors: [
          new GraphQLError('Error', {
            extensions: {
              fullname: '123'
            }
          })
        ]
      }
    };

    render(
      <MockedProvider mocks={[updateProfileModalMock]}>
        <EditProfileModal showElement={showElement.result.current} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => expect(screen.getByTestId('input-error')));
  });
});
