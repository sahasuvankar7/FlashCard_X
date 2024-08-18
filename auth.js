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
    maxAge: 15*30,
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
      if(!credentials?.email || !credentials?.password){
       throw new Error("Invalid credentials");
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
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;

      }
      return token;
    },
    async session({session , token}){
      if(token){
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
});
