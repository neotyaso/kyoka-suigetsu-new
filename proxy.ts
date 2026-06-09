import { withAuth } from "next-auth/middleware"

const proxyHandler = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/api/auth/signin",
  },
})

export default proxyHandler

export const config = {
  matcher: ["/admin/:path*"],
}