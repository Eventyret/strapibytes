import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "@/lib/prisma";
import { IUser } from '@/next-auth';
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  theme: {
    "logo": "/logo.svg"
  },
  events: {
    async signIn(message) {
      await db.user.update({
        where: {
          email: message.user.email!
        },
        data: {
          name: message.user.name,
          image: message.user.image
        }
      })
    }
  },
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await db.user.findFirst({
        where: {
          email: token.email as string,
        },
      });
      if (db_user) {
        token.id = db_user.id
        token.name = db_user.name
        token.email = db_user.email
        token.image = db_user.image
        token.role = db_user.role
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        if (!session.user) session.user = {} as IUser
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,

    })
  ],
};
