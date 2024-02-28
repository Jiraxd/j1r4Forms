import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
    async authorize(credentials){
      const validatedFields = LoginSchema.safeParse(credentials);
      if(validatedFields.success){
        const {email,password} = validatedFields.data;
        const user = await getUserByEmail(email);
        if(!user || !user.password) return null;

        const passMatch = await bcryptjs.compare(password,user.password);
        if(passMatch) return user;
    }
    return null;
}})],
secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig