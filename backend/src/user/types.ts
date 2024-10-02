export interface ToggleUserFollowParams {
  currentUserId: number;
  userToFollowId: number;
}

export interface Follow {
  followedById: number;
  followingId: number;
}

export interface UserFromDb {
  id: number;

  fullname: string;

  bio?: string;

  image?: string;

  email: string;

  followedBy?: Follow[];
}
