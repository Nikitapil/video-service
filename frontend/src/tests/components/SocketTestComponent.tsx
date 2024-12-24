import { useSockets } from '../../hooks/useSockets.ts';

const SocketTestComponent = () => {
  const { socket, joinRoom } = useSockets();

  return (
    <div>
      <button
        onClick={() => joinRoom('test-room')}
        data-testid="join-room-button"
      >
        Join Room
      </button>
      <div data-testid="socket-status">{socket ? 'Connected' : 'Disconnected'}</div>
    </div>
  );
};

export default SocketTestComponent;
