import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  // Add your auth providers (Google, GitHub, etc.) here when ready
});
