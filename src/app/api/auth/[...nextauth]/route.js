import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"
const handler = NextAuth({
   secret: process.env.AUTH_SECRET,
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         type: "credentials",

         credentials: {
            username: { label: "username", type: "text", placeholder: "jsmith" },
            password: { label: "password", type: "password" }
         },

         async authorize(credentials, req) {
            const { username, password } = credentials

            const user = await prisma.user.findUnique({
               where: {
                  username: username
               },
               select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  role: true,
               }
            })

            if (user) {
               const passwordValid = await compare(password, user.password)
               if (passwordValid) {
                  return user
               }
            } else {
               return null
            }

         }

      })

   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
            token.email = user.email
            token.username = user.username
            token.role = user.role
         }
         return token
      },

      async session({ session, token }) {
         session.id = token.id
         session.email = token.email
         session.username = token.username
         session.role = token.role
         return session
      }
   },
   pages: {
      signIn: "/login",
   }
})

export { handler as GET, handler as POST }