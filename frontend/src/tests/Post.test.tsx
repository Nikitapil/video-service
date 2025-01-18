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

describe('Post tests', () => {
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

  it('should call deleteComment method', async () => {
    let deleteMutationCalled = false;
    const date = 'Tue Jan 07 2025';
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedPost, {
        createdAt: date
      })
    );
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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock, commentDeleteMock]}
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
      fireEvent.click(screen.getByTestId('delete-comment'));
      fireEvent.click(screen.getByTestId('modal-confirm-btn'));
      expect(deleteMutationCalled).toBe(true);
    });
  });

  it('should loop through posts', async () => {
    const mock = getStandardPostRequestMock(getMockedObject(mockedExtendedPost));

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock]}
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
      fireEvent.click(screen.getByTestId('loop-up-button'));
      fireEvent.click(screen.getByTestId('loop-down-button'));
      expect(mockNavigate).toHaveBeenCalledTimes(2);
    });
  });

  it('should no loop through posts', async () => {
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        otherPostIds: [0]
      })
    );

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock]}
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
      fireEvent.click(screen.getByTestId('loop-up-button'));
      fireEvent.click(screen.getByTestId('loop-down-button'));
      expect(mockNavigate).toHaveBeenCalledTimes(0);
    });
  });

  it('should call createComment', async () => {
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        otherPostIds: [0]
      })
    );

    let createCommentCalled = false;

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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock, commentCreateMock]}
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
      fireEvent.change(screen.getByTestId('comment-input'), { target: { value: 'text' } });
      fireEvent.click(screen.getByTestId('comment-submit'));
      expect(createCommentCalled).toBe(true);
    });
  });

  it('should call deletePost', async () => {
    const mock = getStandardPostRequestMock(
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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock, postDeleteMock]}
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
      fireEvent.click(screen.getByTestId('delete-post-button'));
      fireEvent.click(screen.getByTestId('modal-confirm-btn'));
      expect(deletePostCalled).toBe(true);
    });
  });

  it('should go to search by hashtag', async () => {
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        otherPostIds: [0],
        tags: ['test']
      })
    );

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock]}
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
      fireEvent.click(screen.getByTestId('tag'));
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('should have edit post button', async () => {
    const mock = getStandardPostRequestMock(
      getMockedObject(mockedExtendedPost, {
        otherPostIds: [0],
        canEdit: true
      })
    );

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
    render(
      <MockedProvider
        mocks={[mock, commentRequestMock]}
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
      expect(screen.getByTestId('edit-post-button')).toBeInTheDocument();
    });
  });
});
