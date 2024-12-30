import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Feed from '../modules/feed/pages/Feed.tsx';
import { GetPostsDocument } from '../gql/graphql.tsx';
import { getMockedObject } from './__mocks__/utils.ts';
import { mockedPost } from './__mocks__/mocks.ts';

describe('Feed tests', () => {
  it('renders not found text', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GetPostsDocument,
              variables: {
                skip: 0,
                take: 2,
                search: ''
              }
            },
            result: {
              data: {
                getPosts: []
              }
            }
          }
        ]}
      >
        <MemoryRouter>
          <Feed />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('not-found-text')).toBeInTheDocument());
  });

  it('should call refetch when tagClick', async () => {
    const mockedResult = {
      data: {
        getPosts: [getMockedObject(mockedPost, { tags: ['tag1'] })]
      },
      loading: false
    };
    const mockedRefetch = vi.fn().mockReturnValue(mockedResult);

    const TESTING_MOCK = {
      request: {
        query: GetPostsDocument,
        variables: {
          skip: 0,
          take: 2,
          search: ''
        }
      },
      result: mockedResult,
      newData: mockedRefetch
    };

    render(
      <MockedProvider
        mocks={[TESTING_MOCK]}
        addTypename={false}
      >
        <MemoryRouter>
          <Feed />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => fireEvent.click(screen.getByTestId('tag')));
    await waitFor(() => expect(mockedRefetch).toHaveBeenCalled());
  });

  it('should call refetch when search', async () => {
    const mockedResult = {
      data: {
        getPosts: [getMockedObject(mockedPost, { tags: ['tag1'] })]
      },
      loading: false
    };
    const mockedRefetch = vi.fn().mockReturnValue(mockedResult);

    const TESTING_MOCK = {
      request: {
        query: GetPostsDocument,
        variables: {
          skip: 0,
          take: 2,
          search: ''
        }
      },
      result: mockedResult,
      newData: mockedRefetch
    };

    render(
      <MockedProvider
        mocks={[TESTING_MOCK]}
        addTypename={false}
      >
        <MemoryRouter>
          <Feed />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('search-post-input'), { target: { value: 'Search' } });

    await waitFor(() => fireEvent.click(screen.getByTestId('search-post-submit')));
    await waitFor(() => expect(mockedRefetch).toHaveBeenCalled());
  });
});
