import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway(+process.env.SOCKET_PORT!, { cors: '*' })
export class SocketGateway {
  constructor(
    private socketService: SocketService,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  @WebSocketServer() public server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    client.join(roomId);
  }

  async handleConnection(client: Socket) {
    if (!client.handshake.headers.authorization) {
      client.disconnect();
      return;
    }
    const payload = await this.jwtService.verifyAsync(
      client.handshake.headers.authorization,
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET')
      }
    );

    if (!payload) {
      client.disconnect();
    } else {
      client.data.user = payload;
    }
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
  }
}
