import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
  },

};

export default nextConfig;
