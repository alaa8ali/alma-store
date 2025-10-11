/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support API Routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize for production
  reactStrictMode: true,
};

module.exports = nextConfig;
