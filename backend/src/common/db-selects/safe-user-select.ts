import { Prisma } from '@prisma/client';

export const safeUserSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  fullname: true,
  bio: true,
  image: true
};
