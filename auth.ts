import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization logic
        // In production, verify against Supabase / Prisma User table
        if (credentials?.email === "admin@flozenai.co" && credentials?.password === "password") {
          return { id: "1", name: "Flozen Admin", email: "admin@flozenai.co" };
        }
        return null; // Return null if user data could not be retrieved
      }
    }),
    // Resend Provider (Magic Links) can be added here once emails are configured.
    // import Resend from "next-auth/providers/resend";
    // Resend({
    //   from: "no-reply@flozenai.co",
    // })
  ],
  callbacks: {
    // Optional callbacks for session manipulation
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    // Custom sign-in pages can be configured here
    // signIn: '/login' 
  }
});
