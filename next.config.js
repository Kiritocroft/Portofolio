/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [75, 85, 95],
  },
  experimental: {
    serverActions: { bodySizeLimit: '1mb' },
  },
};

module.exports = nextConfig;
