import { LikeType } from '../like/types/like.type';
import { UserFromDb } from '../user/types';

export interface PostFromDb {
  id: number;

  text: string;

  createdAt: Date;

  video: string;

  user?: UserFromDb;

  likes?: LikeType[];

  tags: string[];
}
