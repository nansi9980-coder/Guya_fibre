/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'guya-fibre-backend.onrender.com',
        pathname: '/files/**',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig