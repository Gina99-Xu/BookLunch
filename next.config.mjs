/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ohwkfbehnoxenvskawde.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/propertyBucket/**"
      }
    ]
  }
};

export default nextConfig;
