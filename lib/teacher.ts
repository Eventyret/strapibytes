import { Role, User } from '@prisma/client';

export const isTeacher = (user?: Partial<User>) => {
  return user?.role === Role.TEACHER || user?.role === Role.ADMIN;
}