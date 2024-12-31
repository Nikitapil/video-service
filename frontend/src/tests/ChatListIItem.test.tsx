import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatListItem from '../modules/messages/components/ChatListItem.tsx';
import { getMockedObject } from './__mocks__/utils.ts';
import { mockedChatListItem } from './__mocks__/mocks.ts';
import { MemoryRouter } from 'react-router-dom';

describe('ChatListItem tests', () => {
  it('renders correctly unreadMessage count', () => {
    render(
      <MemoryRouter>
        <ChatListItem chat={getMockedObject(mockedChatListItem, { unreadMessagesCount: 1 })} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('unread-message-count')).toBeInTheDocument();
  });
});
