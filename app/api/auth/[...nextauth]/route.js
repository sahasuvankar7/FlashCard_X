// import { handlers } from "@/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/db";
// import { compare } from "bcrypt";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: "Credentials",
//       // credentials is used to generate a suittable form on this sign in form page where we can mention our fields like password , email , domain token etc.
//       // then we can pass through the credentials to function
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         return null;
//       },
//     }),
//   ],
// });

// export {handler as GET , handler as POST}


import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
