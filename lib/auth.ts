import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";

// You can remove the debugging console.log lines now as they are no longer needed.
// console.log("ID CHECK:", process.env.AUTH_GITHUB_ID);
// console.log("SECRET CHECK:", process.env.AUTH_GITHUB_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Using the PrismaAdapter to connect NextAuth with your database.
  // This will automatically handle creating users, sessions, accounts, etc.
  adapter: PrismaAdapter(prisma),

  providers: [
    // --- The Fix ---
    // Instead of just passing the GitHub object, we are calling it as a function
    // and explicitly providing the clientId and clientSecret.
    // This is the most direct and foolproof way to configure a provider.
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // You could add other providers here in the same way, e.g.:
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
    // })
  ],

  // Callbacks allow you to customize the default behavior of NextAuth.
  callbacks: {
    // This callback ensures that the user's unique ID is available in the session object.
    // This is very useful for fetching user-specific data in your application.
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
