import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Observer from '../components/Observer.tsx';

describe('Observer tests', () => {
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }));
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

  it('should render Observer component', () => {
    const mockFn = vi.fn();

    render(<Observer callback={mockFn} />);

    expect(IntersectionObserverMock).toHaveBeenCalled();
  });
});
