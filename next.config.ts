import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "floatingisland.co.kr" },
      { protocol: "https", hostname: "www.floatingisland.co.kr" },
      { protocol: "https", hostname: "www.marinapark.co.kr" },
    ],
  },
};

export default nextConfig;
