import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSockets = () => {
  const [socket, setSocket] = useState<Socket>();

  const connect = useCallback(() => {
    const url = import.meta.env.VITE_APP_SOCKET_URL;
    if (url && !socket) {
      const newSocket = io(url);
      setSocket(newSocket);
    }
  }, [socket]);

  const joinRoom = (roomId: string) => {
    socket?.emit('joinRoom', roomId);
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return { socket, joinRoom };
};
