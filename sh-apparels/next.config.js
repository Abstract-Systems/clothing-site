/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

    images: {
        domains: ['lh3.googleusercontent.com','tailwindui.com','res.cloudinary.com']
      }
      
}

module.exports = nextConfig
