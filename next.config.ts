import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.CIVIC_CLIENT_ID!,
  loginUrl: "/auth/login",
  include: ["/dashboard/*", "/admin/*"],
});

export default withCivicAuth(nextConfig);
