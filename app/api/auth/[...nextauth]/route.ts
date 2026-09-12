import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // Request Blogger API scope to allow posting
          scope: "openid email profile https://www.googleapis.com/auth/blogger",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // We will restrict this to your email later for security
      return true;
    },
    async jwt({ token, account }) {
      // Store the Google access token in the JWT token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
