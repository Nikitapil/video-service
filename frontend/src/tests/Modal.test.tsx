import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { useShowElement } from '../hooks/useShowElement.ts';
import Modal from '../components/ui/Modal.tsx';

describe('Modal tests', () => {
  it('should not render closed modal', async () => {
    const showElement = renderHook(() => useShowElement());

    render(<Modal showElement={showElement.result.current}>123</Modal>);
    await waitFor(() => expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument());
  });

  it('should render opened modal', () => {
    const showElement = renderHook(() => useShowElement(true));

    render(<Modal showElement={showElement.result.current}>123</Modal>);
    waitFor(() => expect(screen.getByTestId('modal-dialog')).toBeInTheDocument());
  });

  it('should not close modal with preventClose prop', () => {
    const mockFn = vi.fn();
    const showElement = {
      isShowed: true,
      open: mockFn,
      close: mockFn
    };

    render(
      <Modal
        showElement={showElement}
        preventClose={true}
      >
        123
      </Modal>
    );

    const overlay = screen.getByTestId('modal-dialog');

    fireEvent.click(overlay);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should close modal with preventClose prop', () => {
    const mockFn = vi.fn();
    const showElement = {
      isShowed: true,
      open: mockFn,
      close: mockFn
    };

    render(<Modal showElement={showElement}>123</Modal>);

    const overlay = screen.getByTestId('modal-dialog');

    fireEvent.click(overlay);

    expect(mockFn).toHaveBeenCalled();
  });
});
