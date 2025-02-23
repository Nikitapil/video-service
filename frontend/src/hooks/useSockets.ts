import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from '../modules/shared/auth/helpers.ts';

export const useSockets = () => {
  const [socket, setSocket] = useState<Socket>();

  const connect = useCallback(() => {
    const url = import.meta.env.VITE_APP_SOCKET_URL;
    if (url && !socket) {
      const socketOptions = {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: getAccessToken()
            }
          }
        }
      };
      const newSocket = io(url, socketOptions);
      setSocket(newSocket);
    }
  }, [socket]);

  const joinRoom = useCallback(
    (roomId: string) => {
      socket?.emit('joinRoom', roomId);
    },
    [socket]
  );

  useEffect(() => {
    connect();

    return () => {
      socket?.disconnect();
    };
  }, [connect, socket]);

  return { socket, joinRoom };
};
