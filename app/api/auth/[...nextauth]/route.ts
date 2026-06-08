import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL
      
      if (user.email === adminEmail) {
        return true 
      }
      return false 
    },
  },
})

export { handler as GET, handler as POST }