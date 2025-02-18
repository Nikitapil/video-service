import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PostShareButton from '../modules/shared/components/PostShareButton.tsx';

describe('PostShareButton tests', () => {
  it('calls can share function', () => {
    const mock = vi.fn();
    window.navigator.canShare = mock;
    render(<PostShareButton text="qwe" />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(mock).toHaveBeenCalled();
  });

  it('calls can share function', () => {
    const canShareMock = vi.fn().mockReturnValue(true);
    const shareMock = vi.fn(() => Promise.resolve());
    window.navigator.canShare = canShareMock;
    window.navigator.share = shareMock;
    render(<PostShareButton text="qwe" />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(shareMock).toHaveBeenCalled();
  });
});
