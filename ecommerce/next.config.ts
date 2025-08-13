/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  output: 'export',
  basePath: isProd ? '/Quickpick' : '',
  assetPrefix: isProd ? '/Quickpick/' : '',
  images: {
    unoptimized: true,
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
};

export default nextConfig;
