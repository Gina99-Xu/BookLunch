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
  },
  // Exclude API routes from static generation
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  }
};

export default nextConfig;
