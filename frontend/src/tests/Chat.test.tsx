import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Chat from '../modules/messages/pages/Chat.tsx';
import { CreateMessageDocument, GetChatDocument } from '../gql/graphql.tsx';
import { mockedChat } from './__mocks__/mocks.ts';
import { MemoryRouter } from 'react-router-dom';

describe('Chat tests', () => {
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }));
  Element.prototype.scrollTo = () => {};
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  it('renders loading state', () => {
    render(
      <MockedProvider mocks={[]}>
        <Chat />
      </MockedProvider>
    );

    expect(screen.getByTestId('chat-loading')).toBeInTheDocument();
  });

  it('renders no chat state', async () => {
    render(
      <MockedProvider mocks={[]}>
        <Chat />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('no-chat-message')).toBeInTheDocument());
  });

  it('set messages correctly', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GetChatDocument,
              variables: {
                chatId: ''
              }
            },
            result: {
              data: {
                getChat: mockedChat
              }
            }
          }
        ]}
      >
        <MemoryRouter>
          <Chat />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getAllByTestId('message').length).toBe(1));
  });

  it('should not send empty message', async () => {
    let createMutationCalled = false;

    const createMessageMutationMock = {
      request: {
        query: CreateMessageDocument
      },
      result: () => {
        createMutationCalled = true;
        return { data: { message: '' } };
      }
    };
    render(
      <MockedProvider
        mocks={[
          createMessageMutationMock,
          {
            request: {
              query: GetChatDocument,
              variables: {
                chatId: ''
              }
            },
            result: {
              data: {
                getChat: mockedChat
              }
            }
          }
        ]}
      >
        <MemoryRouter>
          <Chat />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => fireEvent.click(screen.getByTestId('chat-submit')));
    await waitFor(() => expect(createMutationCalled).toBe(false));
  });

  it('should not send message', async () => {
    let createMutationCalled = false;

    const createMessageMutationMock = {
      request: {
        query: CreateMessageDocument,
        variables: {
          text: 'Change',
          userId: 1
        }
      },
      result: () => {
        createMutationCalled = true;
        return { data: { message: '' } };
      }
    };
    render(
      <MockedProvider
        mocks={[
          createMessageMutationMock,
          {
            request: {
              query: GetChatDocument,
              variables: {
                chatId: ''
              }
            },
            result: {
              data: {
                getChat: mockedChat
              }
            }
          }
        ]}
      >
        <MemoryRouter>
          <Chat />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Change' } }));
    await waitFor(() => fireEvent.click(screen.getByTestId('chat-submit')));
    await waitFor(() => expect(createMutationCalled).toBe(true));
  });
});
