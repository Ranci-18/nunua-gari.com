
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
  experimental: {
    serverComponentsExternalPackages: ['mongodb'], // Treat mongodb as external for RSCs
  },
  webpack: (config, { isServer }) => {
    // Ensure resolve.alias exists and initialize if not
    config.resolve.alias = config.resolve.alias || {};
    
    // Add rules to alias problematic optional MongoDB dependencies to false.
    // This prevents Webpack from trying to bundle these separate packages.
    config.resolve.alias['mongodb-client-encryption'] = false;
    config.resolve.alias['kerberos'] = false;
    config.resolve.alias['snappy'] = false;
    config.resolve.alias['@mongodb-js/zstd'] = false;
    config.resolve.alias['aws4'] = false; 

    // If building for the client-side, provide fallbacks for Node.js core modules
    // to prevent errors if server-only code is inadvertently pulled into the client bundle.
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}), // Ensure fallback object exists
        child_process: false,
        fs: false,
        os: false,
        path: false,
        net: false,
        tls: false,
        dns: false,
      };
    }

    return config;
  },
};

export default nextConfig;
