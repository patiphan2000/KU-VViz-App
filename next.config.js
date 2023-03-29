/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KU_PUBLIC_KEY: process.env.KU_PUBLIC_KEY,
    BASE_URL: process.env.BASE_URL
  }
}

module.exports = nextConfig
