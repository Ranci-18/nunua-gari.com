
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // Added PostImage hostname
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    // Add rules to alias problematic optional MongoDB dependencies to false.
    // This prevents errors related to 'child_process' or other Node.js native modules
    // when these parts of the driver are not used (e.g., client-side encryption, native Kerberos).
    config.resolve.alias = {
      ...config.resolve.alias,
      'mongodb-client-encryption': false,
      'kerberos': false,
      'snappy': false,
      '@mongodb-js/zstd': false,
      'aws4': false, 
    };

    return config;
  },
};

export default nextConfig;
