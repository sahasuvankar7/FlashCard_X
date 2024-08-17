import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt , {hash} from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
    authorize:async (credentials)=>{
      if(!credentials ||!credentials.email || !credentials.password){
        console.log("fucked up")
        return "wrong";
      }
      const email = credentials.email;
      const password = credentials.password;
      const hashPassword =  hash(password,10);
      let user = await prisma.user.findUnique({
        where:{
          email
        }
      })
      if(!user){
        user = await prisma.user.create({
          data:{
            email,
            password:hashPassword
          }
        })
      }else{
        const isMatch = bcrypt.compareSync(credentials.password , user.password);
        if(!isMatch){
          throw new Error("incorrect password");
        }
      }
      return user;
    }
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
