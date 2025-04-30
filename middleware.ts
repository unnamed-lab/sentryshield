import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

export default authMiddleware({
  loginUrl: "/auth/login",
  clientId: process.env.CIVIC_CLIENT_ID,
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/profile/:path*",
  ],
};
