/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  compress: true,
  preload: true,
  images: {
    domains: ["fakestoreapi.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
