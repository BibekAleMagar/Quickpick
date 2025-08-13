/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Quick-Pick' : '',
  assetPrefix: isProd ? '/Quick-Pick/' : '',
  images: {
    unoptimized: true,
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
};

export default nextConfig;
