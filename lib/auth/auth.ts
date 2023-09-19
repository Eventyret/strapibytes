"use server"
import { db } from '@/lib/prisma';
import { Role, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './next-auth-config';

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export const getUserRole = async () => {
  const user = await getUser()
  return user?.role
}
export const getUser = async (): Promise<User | null> => {
  const session = await getAuthSession()
  if (!session?.user) return null;
  const user = await db.user.findUnique({
    where: {
      id: session.user.id
    },

  })
  return user
}
export const updateRole = async (id: string, role: Role) => {
  const user = await db.user.update({
    where: {
      id
    },
    data: {
      role
    }
  })
  return user
}