/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports ={
    nextConfig,
    async rewrites() {
        return [
          {
            source: '/api/auth/:path*',
            destination: '/api/auth',
          },
        ];
      },
}
