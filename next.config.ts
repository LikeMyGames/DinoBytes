import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.kroger.com',
        port: '',
        pathname: '',
        search: '',
      }
    ]
  }
};

export default nextConfig;
