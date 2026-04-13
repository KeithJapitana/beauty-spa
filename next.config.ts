import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add Supabase storage domain for optimized images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'srxldfhypsteusdcnvtz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimize imports at build time
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Use Turbopack (Next.js 16 default)
  turbopack: {},

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Compress production responses
  compress: true,

  // Power user optimizations
  poweredByHeader: false,

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
