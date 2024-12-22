import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from '../components/ui/tabs/Tabs.tsx';

describe('Tabs', () => {
  const tabs = [
    { value: '1', title: 'Tab 1' },
    { value: '2', title: 'Tab 2' },
    { value: '3', title: 'Tab 3' }
  ];

  const mockFn = vi.fn();

  it('Should render all Tabs', () => {
    render(
      <Tabs
        tabs={tabs}
        activeTab="1"
        setActiveTab={mockFn}
      />
    );

    expect(screen.getAllByTestId('tab')).toHaveLength(tabs.length);
  });

  it('Should work clickHandler', () => {
    render(
      <Tabs
        tabs={tabs}
        activeTab="1"
        setActiveTab={mockFn}
      />
    );

    const tabsEls = screen.getAllByTestId('tab');

    fireEvent.click(tabsEls[0]);

    expect(mockFn).toHaveBeenCalledWith('1');
  });
});
