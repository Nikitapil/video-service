import { UserFromDb } from '../user/types';
import { LikeType } from '../like/types/like.type';

export interface PostFromDb {
  id: number;

  text: string;

  createdAt: Date;

  video: string;

  user?: UserFromDb;

  likes?: LikeType[];

  tags: string[];

  _count: {
    likes: number;
  };
}
