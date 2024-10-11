import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SendMessageToRoomParams } from './types';

@Injectable()
export class SocketService {
  socket: Server;

  sendMessageToRoom<T>({ message, roomId }: SendMessageToRoomParams<T>) {
    this.socket.to(roomId).emit('message', message);
  }
}
