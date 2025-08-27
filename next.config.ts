import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    YT_API_KEY: process.env.YT_API_KEY,
  },
};

export default nextConfig;
