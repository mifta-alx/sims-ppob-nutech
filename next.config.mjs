/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://minio.nutech-integrasi.com/take-home-test/**"),
    ],
  },
}

export default nextConfig
