import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Adapter } from "next-auth/adapters"
import bcrypt from 'bcrypt'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.toString() as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET?.toString() as string,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: { label: "Username", type: "text"},
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials: any) {

        if (!credentials.email || !credentials.password ){
          return null;  
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase()
          }
        })

        if(!user){
          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword as string)

        if (!passwordMatch) {
          return null
        }

        // console.log("USER")
        // console.log(user)

        return user;
      }
    })
  ],
secret: process.env.NEXTAUTH_SECRET,
adapter: PrismaAdapter(prisma) as Adapter,
session: {
  strategy: "jwt"
},
pages: {
  signIn: '/login'
},
debug: process.env.NODE_ENV === "development" ? true : false,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }