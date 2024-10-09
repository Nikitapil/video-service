import { getSafeUserSelectFull } from '../common/db-selects/safe-user-select';

export const getMessageInclude = (currentUserId: number) => {
  return {
    author: {
      select: getSafeUserSelectFull(currentUserId)
    }
  };
};
