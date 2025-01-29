import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PostProfile from '../modules/profile/components/PostProfile.tsx';
import { mockedPost } from './__mocks__/mocks.ts';
import { MemoryRouter } from 'react-router-dom';

describe('PostProfile tests', () => {
  const playMock = vi.fn();
  const pauseMock = vi.fn();
  window.HTMLMediaElement.prototype.load = () => {};
  window.HTMLMediaElement.prototype.play = playMock;
  window.HTMLMediaElement.prototype.pause = pauseMock;
  it('renders loader', () => {
    render(
      <MemoryRouter>
        <PostProfile post={mockedPost} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('post-loading')).toBeInTheDocument();
  });

  it('shout call play and pause functions', () => {
    render(
      <MemoryRouter>
        <PostProfile post={mockedPost} />
      </MemoryRouter>
    );

    fireEvent.mouseEnter(screen.getByTestId('post-video'));

    expect(playMock).toHaveBeenCalled();

    fireEvent.mouseLeave(screen.getByTestId('post-video'));

    expect(pauseMock).toHaveBeenCalled();
  });

  it('shout hide loader', () => {
    render(
      <MemoryRouter>
        <PostProfile post={mockedPost} />
      </MemoryRouter>
    );

    fireEvent.canPlay(screen.getByTestId('post-video'));

    expect(screen.queryByTestId('post-loading')).not.toBeInTheDocument();
  });
});
