import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.neon.tech',
      },
      {
        protocol: 'https',
        hostname: 'aratha.in',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'canvas-confetti'],
  },
};

export default withPayload(nextConfig);
