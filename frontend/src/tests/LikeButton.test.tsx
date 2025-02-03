import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { LikePostDocument } from '../gql/graphql.tsx';
import { mockedPost } from './__mocks__/mocks.ts';
import LikeButton from '../modules/shared/likes/components/LikeButton.tsx';
import { getMockedObject } from './__mocks__/utils.ts';

describe('LikeButton', () => {
  it('should call toggle like', async () => {
    let isToggleMockCalled = false;
    const toggleFollowMock = {
      request: {
        query: LikePostDocument,
        variables: {
          postId: mockedPost.id
        }
      },
      result: () => {
        isToggleMockCalled = true;
        return {
          data: {
            toggleLikePost: {
              isLiked: true
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[toggleFollowMock]}>
        <LikeButton post={mockedPost} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('icon-button'));

    await waitFor(() => expect(isToggleMockCalled).toBe(true));

    expect(screen.getByTestId('action-count').textContent).toBe('1');
  });

  it('should decrease likes count', async () => {
    const toggleFollowMock = {
      request: {
        query: LikePostDocument,
        variables: {
          postId: mockedPost.id
        }
      },
      result: () => {
        return {
          data: {
            toggleLikePost: {
              isLiked: false
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[toggleFollowMock]}>
        <LikeButton post={getMockedObject(mockedPost, { likesCount: 1 })} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('icon-button'));

    await waitFor(() => expect(screen.getByTestId('action-count').textContent).toBe('0'));
  });
});
