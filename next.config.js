/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KU_PUBLIC_KEY: process.env.KU_PUBLIC_KEY,
  }
}

module.exports = nextConfig
