import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from '../modules/messages/components/Message.tsx';
import { mockedMessage } from './__mocks__/mocks.ts';
import { getMockedObject } from './__mocks__/utils.ts';

describe('Message tests', () => {
  it('should render with correct classes for not my messages', () => {
    render(<Message message={mockedMessage} />);

    expect(screen.getByTestId('message')).toHaveClass('bg-blue-400');
  });

  it('should render with correct classes for my messages', () => {
    render(<Message message={getMockedObject(mockedMessage, { isMyMessage: true })} />);

    expect(screen.getByTestId('message')).toHaveClass('bg-purple-400');
  });
});
