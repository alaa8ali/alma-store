import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Allow dynamic URLs from Vercel
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      // Check if user email is in allowed list
      const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS || "").split(",").map(e => e.trim());
      const userEmail = user.email || "";
      
      console.log("Sign in attempt:", userEmail);
      console.log("Allowed emails:", allowedEmails);
      
      return allowedEmails.includes(userEmail);
    },
    async session({ session, token }) {
      // Add admin flag to session
      if (session.user) {
        session.user.isAdmin = true;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = true;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

