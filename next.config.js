/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.gsmarena.com', 'fdn2.gsmarena.com', 'cdn.gsmarena.com', 'gsmarena-three.vercel.app'],
  },
}

module.exports = nextConfig
