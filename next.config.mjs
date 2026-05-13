/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Extract hostname from API_URL for Next.js image optimization
let apiHostname = 'localhost'
let apiPort = undefined
let apiProtocol = 'http'
try {
  const url = new URL(API_URL)
  apiHostname = url.hostname
  apiPort = url.port || undefined
  apiProtocol = url.protocol.replace(':', '')
} catch {}

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: apiProtocol,
        hostname: apiHostname,
        ...(apiPort ? { port: apiPort } : {}),
        pathname: '/files/**',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
