import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tab from '../components/ui/tabs/Tab.tsx';

describe('Tab tests', () => {
  const mockFn = vi.fn();

  it('Should render active state', () => {
    render(
      <Tab
        text="text"
        isActive={true}
        clickHandler={mockFn}
      />
    );

    expect(screen.getByTestId('tab')).toHaveClass('border-b border-b-black');
  });

  it('Should not render active state', () => {
    render(
      <Tab
        text="text"
        isActive={false}
        clickHandler={mockFn}
      />
    );

    expect(screen.getByTestId('tab')).toHaveClass('border-b text-gray-500');
  });
});
