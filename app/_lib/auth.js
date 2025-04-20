import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'
import { createUser, getUserByEmail } from "./data-service";


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
      console.log('signIn callback triggered');
      console.log('user is', user);
      console.log('profile is', profile)


      try {
        let dbUser = await getUserByEmail(user.email);

        if (!dbUser) {
          dbUser = await createUser({
            email: user.email,
            name: profile.name || user.name,
          });
        }

        // Add the database user id to the user object
        user.id = dbUser.id;
        return true;
      } catch (error) {
        console.error('SignIn Error:', error.message);
        return false;
      }
    },

    async session({ session, token }) {
      console.log('session callback triggered...');
      console.log('session is', session);
      console.log('token is', token);

      if (token) {
        // Use token data to populate session
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },

    async jwt({ token, user, account, profile }) {
      console.log('jwt callback triggered...');
      console.log('token is', token);
      console.log('user is', user);
      console.log('account is', account);
      console.log('profile is', profile);

      if (user) {
        console.log('User is:', user);
        // Store essential user data in the token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    pages: {
      signIn: '/login',
      error: '/auth/error'
    }
  }
}


export const {
  auth, signIn, signOut, handlers: { GET, POST }
} = NextAuth(authConfig);