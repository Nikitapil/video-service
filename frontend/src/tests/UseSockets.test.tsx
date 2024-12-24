import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { io } from 'socket.io-client';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import SocketTestComponent from './components/SocketTestComponent.tsx';

vi.mock('socket.io-client');
vi.spyOn(localStorage, 'getItem').mockReturnValue('test-token');

describe('useSockets', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('connects to the socket server on mount', () => {
    render(<SocketTestComponent />);

    expect(io).toHaveBeenCalled();
    waitFor(() => expect(screen.getByTestId('socket-status')).toHaveTextContent('Connected'));
  });

  it('calls joinRoom when the button is clicked', () => {
    render(<SocketTestComponent />);

    const joinRoomButton = screen.getByTestId('join-room-button');
    fireEvent.click(joinRoomButton);

    const mocked = io();

    waitFor(() => expect(mocked.emit).toHaveBeenCalledWith('joinRoom', 'test-room'));
  });

  it('disconnects the socket on unmount', () => {
    const { unmount } = render(<SocketTestComponent />);

    unmount();

    waitFor(() => expect(io().disconnect).toHaveBeenCalled());
  });

  it('does not create a new socket if one already exists', () => {
    const { rerender } = render(<SocketTestComponent />);

    rerender(<SocketTestComponent />);

    expect(io).toHaveBeenCalledTimes(1);
  });

  it('returns undefined socket if VITE_APP_SOCKET_URL is not set', () => {
    const originalUrl = import.meta.env.VITE_APP_SOCKET_URL;
    delete import.meta.env.VITE_APP_SOCKET_URL;

    render(<SocketTestComponent />);

    expect(screen.getByTestId('socket-status')).toHaveTextContent('Disconnected');
    expect(io).not.toHaveBeenCalled();

    import.meta.env.VITE_APP_SOCKET_URL = originalUrl;
  });
});
