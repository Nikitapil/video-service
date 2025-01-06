import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Post from '../modules/post/pages/Post.tsx';
import { GetPostByIdDocument } from '../gql/graphql.tsx';
import { mockedPost } from './__mocks__/mocks.ts';
import { getMockedObject } from './__mocks__/utils.ts';
import { formatDate } from '../utils/dates.ts';

describe('Post tests', () => {
  const getStandardPostRequestMock = (mock = mockedPost) => {
    return {
      request: {
        query: GetPostByIdDocument,
        variables: {
          id: 1
        }
      },
      result: {
        data: {
          getPostById: mock,
          loading: false
        }
      }
    };
  };

  it('should render loading state', async () => {
    render(
      <MockedProvider mocks={[getStandardPostRequestMock()]}>
        <MemoryRouter>
          <Post />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('post-loading')).toBeInTheDocument());
  });

  it('should render empty state', async () => {
    render(
      <MockedProvider mocks={[getStandardPostRequestMock()]}>
        <MemoryRouter>
          <Post />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('not-found')).toBeInTheDocument());
  });

  it('should render date correctly', async () => {
    const date = 'Tue Jan 07 2025';
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedPost, {
        createdAt: date
      })
    );
    render(
      <MockedProvider
        mocks={[mock]}
        addTypename={false}
      >
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route
              path="/post/:id"
              element={<Post />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      return expect(screen.getByTestId('post-created-date').textContent).toBe(formatDate(date));
    });
  });
});
