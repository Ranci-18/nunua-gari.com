
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
    // Add a rule to alias 'mongodb-client-encryption' to false.
    // This is to prevent errors related to 'child_process' when client-side encryption is not used by the mongodb driver.
    config.resolve.alias = {
      ...config.resolve.alias,
      'mongodb-client-encryption': false,
    };

    // Note: Other optional MongoDB native dependencies that might sometimes cause issues
    // in specific environments if not used can also be excluded or marked as external if needed:
    // e.g., 'kerberos', 'snappy', '@mongodb-js/zstd'
    // For now, we only address the specific 'child_process' issue via 'mongodb-client-encryption'.

    return config;
  },
};

export default nextConfig;
