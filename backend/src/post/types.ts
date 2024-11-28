import { UserFromDb } from '../user/types';
import { LikeType } from '../like/types/like.type';
import { GetPostsDto } from './dto/GetPosts.dto';

export interface GetPostsParams {
  dto: GetPostsDto;
  currentUserId: number;
}

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
    comments: number;
  };
}
