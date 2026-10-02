/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 50, 75, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // Send the old Newborn & Maternity page to the new newborn landing page
      {
        source: '/services/newborn-maternity',
        destination: '/newborn-photography-dubai',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
