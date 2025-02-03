import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateMessageDocument, SearchUsersDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { useShowElement } from '../hooks/useShowElement.ts';
import CreateMessageModal from '../modules/shared/create-message/components/CreateMessageModal.tsx';

describe('CreateMessageModal tests', () => {
  const searchUsersMock = {
    request: {
      query: SearchUsersDocument,
      variables: {
        search: '123'
      }
    },
    result: {
      data: {
        getUsers: [mockedUser]
      }
    }
  };

  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: vi.fn(),
        useSearchParams: vi.fn(() => [new URLSearchParams('')]) // defaults to empty
      };
    });
  });

  it('should call getUsers onSearch', async () => {
    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[searchUsersMock]}>
        <MemoryRouter>
          <CreateMessageModal showElement={showElement.result.current} />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('app-combobox-input'), { target: { value: '123' } });
    fireEvent.focus(screen.getByTestId('app-combobox-input'));

    await waitFor(() => expect(screen.getByTestId('options-container')).toBeInTheDocument());
  });

  it('should not submit without user', async () => {
    let isCreateMessageCalled = false;
    const createMessageMock = {
      request: {
        query: CreateMessageDocument,
        variables: {
          userId: 123,
          text: 'test'
        }
      },
      result: () => {
        isCreateMessageCalled = true;
        return {};
      }
    };

    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[searchUsersMock, createMessageMock]}>
        <MemoryRouter>
          <CreateMessageModal showElement={showElement.result.current} />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.submit(screen.getByTestId('app-form'));

    await waitFor(() => expect(isCreateMessageCalled).not.toBe(true));
  });

  it('should submit form', async () => {
    let isCreateMessageCalled = false;
    const createMessageMock = {
      request: {
        query: CreateMessageDocument,
        variables: {
          userId: 123,
          text: 'test'
        }
      },
      result: () => {
        isCreateMessageCalled = true;
        return {};
      }
    };

    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[searchUsersMock, createMessageMock]}>
        <MemoryRouter>
          <CreateMessageModal
            showElement={showElement.result.current}
            userTo={{ id: 123, fullname: '123' }}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'test' } });
    fireEvent.submit(screen.getByTestId('app-form'));

    await waitFor(() => expect(isCreateMessageCalled).toBe(true));
  });

  it('should navigate after submit', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    const createMessageMock = {
      request: {
        query: CreateMessageDocument,
        variables: {
          userId: 123,
          text: 'test'
        }
      },
      result: () => {
        return {
          data: {
            createMessage: {
              chatId: 123
            }
          }
        };
      }
    };

    const showElement = renderHook(() => useShowElement(true));
    render(
      <MockedProvider mocks={[searchUsersMock, createMessageMock]}>
        <MemoryRouter>
          <CreateMessageModal
            showElement={showElement.result.current}
            userTo={{ id: 123, fullname: '123' }}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'test' } });
    fireEvent.submit(screen.getByTestId('app-form'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });
});
