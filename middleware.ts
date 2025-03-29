import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

export default authMiddleware();

export const config = {
  // include the paths you wish to secure here
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*.jpg|.*.png|.*.svg|.*.gif).*)",
  ],
};
