import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway(+process.env.SOCKET_PORT, { cors: '*' })
export class SocketGateway {
  constructor(private socketService: SocketService) {}

  @WebSocketServer() public server: Server;

  @SubscribeMessage('joinRoom')
  handleMessage(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(roomId);
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
  }
}
