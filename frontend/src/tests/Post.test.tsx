import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Post from '../modules/post/pages/Post.tsx';
import {
  CreateCommentDocument,
  DeleteCommentDocument,
  DeletePostDocument,
  GetCommentsByPostIdDocument,
  GetPostByIdDocument
} from '../gql/graphql.tsx';
import { mockedComment, mockedExtendedPost, mockedPost } from './__mocks__/mocks.ts';
import { getMockedObject } from './__mocks__/utils.ts';
import { formatDate } from '../utils/dates.ts';
import type { MockedResponse } from '@apollo/client/testing/core';

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

  const renderPostPage = ({
    mocks,
    initialEntries = ['/post/1']
  }: {
    mocks: ReadonlyArray<MockedResponse<any, any>>;
    initialEntries?: string[];
  }) => {
    render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path="/post/:id"
              element={<Post />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  };

  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: vi.fn(),
        useSearchParams: vi.fn(() => [new URLSearchParams('')]) // defaults to empty
      };
    });
  });

  it('should render loading state', async () => {
    renderPostPage({ mocks: [getStandardPostRequestMock()], initialEntries: ['/post/2'] });

    await waitFor(() => expect(screen.getByTestId('post-loading')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('not-found')).toBeInTheDocument());
  });

  it('should render date correctly', async () => {
    const date = 'Tue Jan 07 2025';

    const mock = getStandardPostRequestMock(
      getMockedObject(mockedPost, {
        createdAt: date
      })
    );
    renderPostPage({ mocks: [mock], initialEntries: ['/post/1'] });

    await waitFor(() => {
      return expect(screen.getByTestId('post-created-date').textContent).toBe(formatDate(date));
    });
  });

  it('should call deleteComment method', async () => {
    let deleteMutationCalled = false;
    const postMock = getStandardPostRequestMock();

    const commentDeleteMock = {
      request: {
        query: DeleteCommentDocument,
        variables: {
          id: 123
        }
      },
      result: () => {
        deleteMutationCalled = true;
        return { data: { message: '' } };
      }
    };

    const commentRequestMock = {
      request: {
        query: GetCommentsByPostIdDocument,
        variables: {
          postId: 1
        }
      },
      result: {
        data: {
          getCommentsByPostId: [mockedComment]
        }
      }
    };

    renderPostPage({ mocks: [postMock, commentDeleteMock, commentRequestMock] });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('delete-comment'));
      fireEvent.click(screen.getByTestId('modal-confirm-btn'));
      expect(deleteMutationCalled).toBe(true);
    });
  });

  it('should loop through posts', async () => {
    const postMock = getStandardPostRequestMock(getMockedObject(mockedExtendedPost));

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    renderPostPage({ mocks: [postMock] });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('loop-up-button'));
      fireEvent.click(screen.getByTestId('loop-down-button'));
      expect(mockNavigate).toHaveBeenCalledTimes(2);
    });
  });

  it('should no loop through posts', async () => {
    const postMock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        otherPostIds: [0]
      })
    );

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    renderPostPage({ mocks: [postMock] });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('loop-up-button'));
      fireEvent.click(screen.getByTestId('loop-down-button'));
      expect(mockNavigate).toHaveBeenCalledTimes(0);
    });
  });

  it('should call createComment', async () => {
    let createCommentCalled = false;

    const postMock = getStandardPostRequestMock();

    const commentCreateMock = {
      request: {
        query: CreateCommentDocument,
        variables: {
          postId: 1,
          text: 'text'
        }
      },
      result: () => {
        createCommentCalled = true;
        return { data: { message: '' } };
      }
    };
    renderPostPage({ mocks: [postMock, commentCreateMock] });

    await waitFor(() => {
      fireEvent.change(screen.getByTestId('comment-input'), { target: { value: 'text' } });
      fireEvent.click(screen.getByTestId('comment-submit'));
      expect(createCommentCalled).toBe(true);
    });
  });

  it('should call deletePost', async () => {
    const postMock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        canDelete: true
      })
    );

    let deletePostCalled = false;

    const postDeleteMock = {
      request: {
        query: DeletePostDocument,
        variables: {
          id: 1
        }
      },
      result: () => {
        deletePostCalled = true;
        return { data: { message: '' } };
      }
    };

    renderPostPage({ mocks: [postMock, postDeleteMock] });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('delete-post-button'));
      fireEvent.click(screen.getByTestId('modal-confirm-btn'));
      expect(deletePostCalled).toBe(true);
    });
  });

  it('should go to search by hashtag', async () => {
    const postMock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        tags: ['test']
      })
    );

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    renderPostPage({ mocks: [postMock] });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('tag'));
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('should have edit post button', async () => {
    const postMock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        canEdit: true
      })
    );

    renderPostPage({ mocks: [postMock] });

    await waitFor(() => {
      expect(screen.getByTestId('edit-post-button')).toBeInTheDocument();
    });
  });
});
