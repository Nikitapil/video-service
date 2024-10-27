import { getSafeUserSelectFull } from './safe-user-select';

export const getCommentInclude = (currentUserId: number) => {
  return {
    user: {
      select: getSafeUserSelectFull(currentUserId)
    }
  };
};
