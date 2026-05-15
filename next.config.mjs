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
      // ✅ Cloudinary — stockage des médias uploadés depuis l'admin
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
