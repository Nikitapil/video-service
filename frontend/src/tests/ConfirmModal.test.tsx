import { describe, it, expect, vi } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import ConfirmModal from '../components/ux/ConfirmModal.tsx';
import { useShowElement } from '../hooks/useShowElement.ts';

describe('ConfirmModal tests', () => {
  const mockFn = vi.fn();
  it('should render Modal with correct title', () => {
    const showElement = renderHook(() => useShowElement(true));
    const title = 'title';
    render(
      <ConfirmModal
        showElement={showElement.result.current}
        title={title}
        onConfirm={mockFn}
      />
    );

    expect(screen.getByTestId('modal-title')).toHaveTextContent(title);
  });
});
