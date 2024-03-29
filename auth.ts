import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import{ type Session} from "next-auth";
import type { JWT } from "next-auth/jwt"
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages:{
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events:{
    async linkAccount({user}){
      await db.user.update({where:{id:user.id},data:{emailVerified:new Date()}});
    }
  },
  callbacks: {
    async signIn({user}){
      return true;
    },
    async session({ session, token }: { session: Session; token?: JWT }) {
      if(token){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
    }
      return session;
    },
    async jwt({token}){
      return token;
    }
  },
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
});