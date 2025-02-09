import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
