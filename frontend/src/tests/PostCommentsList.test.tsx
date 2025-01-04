import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostCommentsList from '../modules/post/components/PostCommentsList.tsx';
import { mockedComment } from './__mocks__/mocks.ts';

describe('PostCommentsList tests', () => {
  it('renders without crashing', () => {
    const handleDeleteComment = vi.fn();
    render(
      <MemoryRouter>
        <PostCommentsList
          comments={[mockedComment]}
          handleDeleteComment={handleDeleteComment}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('delete-comment'));
    fireEvent.click(screen.getByTestId('modal-confirm-btn'));
    expect(handleDeleteComment).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const handleDeleteComment = vi.fn();
    render(
      <MemoryRouter>
        <PostCommentsList
          comments={[]}
          handleDeleteComment={handleDeleteComment}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-text')).toBeInTheDocument();
  });
});
