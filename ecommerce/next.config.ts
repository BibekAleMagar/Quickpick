/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Quick-Pick',
  assetPrefix: '/Quick-Pick/',
  images: {
    unoptimized: true,
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
};

export default nextConfig;
