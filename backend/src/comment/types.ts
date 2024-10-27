import { UserFromDb } from '../user/types';

export interface CommentFromDb {
  id: number;
  user: UserFromDb;
  text: string;
  createdAt: Date;
}
