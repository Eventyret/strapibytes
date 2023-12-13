import { User } from '@prisma/client';

export const isTeacher = (user?: Pick<User, "role">) => {
  return user?.role === 'TEACHER' || user?.role === 'ADMIN';
}