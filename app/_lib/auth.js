import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'
import { createUser, getUser, getUserByEmail } from "./data-service";


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_SECRET
    })
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },

    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          await createUser({ email: user.email, fullName: user.fullName })
        }
        return true

      } catch (error) {
        console.log(error.message)
        return false
      }
    },

    async session({ session, user }) {
      const existingUser = await getUserByEmail(session.user.email);
      session.user.userId = existingUser.id;
      return session
    },

    pages: {
      signIn: '/login'
    }

  }
}
export const {
  auth, signIn, signOut, handlers: { GET, POST }
} = NextAuth(authConfig);