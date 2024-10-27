import { getSafeUserSelectFull } from './safe-user-select';

export const getPostInclude = (currentUserId?: number) => {
  return {
    user: {
      select: getSafeUserSelectFull(currentUserId)
    },
    likes: {
      where: { userId: currentUserId }
    },
    _count: {
      select: {
        likes: true,
        comments: true
      }
    }
  };
};
