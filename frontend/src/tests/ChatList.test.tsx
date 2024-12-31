import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatList from '../modules/messages/components/ChatList.tsx';
import { mockedChatListItem } from './__mocks__/mocks.ts';
import { MemoryRouter } from 'react-router-dom';

describe('ChatList tests', () => {
  it('renders loader', () => {
    render(
      <ChatList
        chats={[]}
        isLoading={true}
      />
    );

    expect(screen.getByTestId('chat-list-loader')).toBeInTheDocument();
  });

  it('renders no chats message', () => {
    render(
      <ChatList
        chats={[]}
        isLoading={false}
      />
    );

    expect(screen.getByTestId('no-chats-text')).toBeInTheDocument();
  });

  it('renders chats list', () => {
    render(
      <MemoryRouter>
        <ChatList
          chats={[mockedChatListItem]}
          isLoading={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('chat-list')).toBeInTheDocument();
  });
});
