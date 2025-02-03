import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FollowButton from '../modules/shared/follows/components/FollowButton.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { getMockedObject } from './__mocks__/utils.ts';
import { ToggleUserFollowDocument } from '../gql/graphql.tsx';

describe('FollowButton tests', () => {
  it('renders correctly with followed state', () => {
    render(
      <MockedProvider mocks={[]}>
        <FollowButton user={getMockedObject(mockedUser, { canFollow: true })} />
      </MockedProvider>
    );

    expect(screen.getByTestId('app-button').textContent).toBe('Follow');
  });

  it('call toggleFollow method', async () => {
    let isToggleMockCalled = false;
    const toggleFollowMock = {
      request: {
        query: ToggleUserFollowDocument,
        variables: {
          userToFollowId: mockedUser.id
        }
      },
      result: () => {
        isToggleMockCalled = true;
        return {
          data: {
            toggleUserFollow: {
              isFollowed: true
            }
          }
        };
      }
    };
    render(
      <MockedProvider mocks={[toggleFollowMock]}>
        <FollowButton user={getMockedObject(mockedUser, { canFollow: true })} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('app-button'));

    await waitFor(() => expect(isToggleMockCalled).toBe(true));
  });
});
