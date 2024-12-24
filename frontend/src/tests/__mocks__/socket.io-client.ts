import { vi } from 'vitest';

const mockSocket = {
  emit: vi.fn(),
  disconnect: vi.fn(),
  on: vi.fn(),
  off: vi.fn()
};

export const io = vi.fn(() => mockSocket);
export const Socket = vi.fn();
