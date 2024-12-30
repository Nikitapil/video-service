import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FeedPost from '../modules/feed/components/FeedPost.tsx';
import { getMockedObject } from './__mocks__/utils.ts';
import { mockedPost } from './__mocks__/mocks.ts';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { getProfileLink } from '../router/routes.ts';

describe('FeedPost tests', () => {
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

  const mockedTagClick = vi.fn();

  it('should get correct profile link', async () => {
    const post = getMockedObject(mockedPost);

    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <FeedPost
            post={post}
            onTagClick={mockedTagClick}
          />
        </MemoryRouter>
      </MockedProvider>
    );
    console.log(screen.getByTestId('feed-post-link').attributes);
    expect(screen.getByTestId('feed-post-link').getAttribute('href')).toBe(getProfileLink(post.user.id));
  });

  it('should navigate to post', async () => {
    const post = getMockedObject(mockedPost);

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <FeedPost
            post={post}
            onTagClick={mockedTagClick}
          />
        </MemoryRouter>
      </MockedProvider>
    );
    const btn = screen.getByTestId('go-to-post');

    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should render post with tags', async () => {
    const post = getMockedObject(mockedPost, {
      tags: ['tag1', 'tag2']
    });

    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <FeedPost
            post={post}
            onTagClick={mockedTagClick}
          />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(screen.getAllByTestId('tag').length).toBe(post.tags.length);
  });

  it('should render post without', async () => {
    const post = getMockedObject(mockedPost, {
      tags: undefined
    });

    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <FeedPost
            post={post}
            onTagClick={mockedTagClick}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.queryAllByTestId('tag')?.length).toBe(0);
  });
});
