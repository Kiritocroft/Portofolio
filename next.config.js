/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
    qualities: [75, 85, 95],
  },
  experimental: {
    serverActions: { bodySizeLimit: '10mb' },
  },
  // Map gsap subpath imports to dist files to avoid resolution issues in Next.js
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'gsap/ScrollTrigger': 'gsap/dist/ScrollTrigger',
      // Add other common GSAP plugins here if needed
      // 'gsap/ScrollToPlugin': 'gsap/dist/ScrollToPlugin',
      // 'gsap/Observer': 'gsap/dist/Observer',
      // 'gsap/MotionPathPlugin': 'gsap/dist/MotionPathPlugin',
    };

    return config;
  },
};

module.exports = nextConfig;
