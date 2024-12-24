import { describe, it, expect, vi } from 'vitest';
import { useDebounce } from '../hooks/useDebounce.ts';

describe('UseDebounce tests', () => {
  it('Should correctly cal fn with debounce', () => {
    vi.useFakeTimers();
    const mockedFn = vi.fn();

    const debounced = useDebounce(mockedFn);

    debounced(1);
    debounced(2);

    expect(mockedFn).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(mockedFn).toHaveBeenCalledWith(2);
  });
});
