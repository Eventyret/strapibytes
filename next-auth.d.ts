import { Role } from '@prisma/client';
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  id: string;
  name: string
  role: Role
}
declare module "next-auth" {
  interface User extends IUser { }
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser { }
}