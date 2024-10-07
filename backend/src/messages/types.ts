import { CreateMessageDto } from './dto/create-message.dto';

export interface ICreateMessageParams {
  dto: CreateMessageDto;
  authorId: number;
}
