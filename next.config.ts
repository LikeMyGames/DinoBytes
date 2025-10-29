import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // assetPrefix: '/out/',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.kroger.com',
      }
    ]
  },

};

export default nextConfig;

// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// initOpenNextCloudflareForDev();