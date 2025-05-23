
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
        hostname: 'i.postimg.cc', // Existing PostImage CDN hostname
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'postimg.cc', // Added main PostImage hostname
        port: '',
        pathname: '/**',
      }
    ],
  },
  serverExternalPackages: ['mongodb'], // Ensure mongodb is external for RSC
  experimental: {
    allowedDevOrigins: [
        "*",
        "https://9005-firebase-studio-1747811799289.cluster-c3a7z3wnwzapkx3rfr5kz62dac.cloudworkstations.dev",
    ],
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

    // For server-side, ensure 'mongodb' is treated as an external module.
    if (isServer) {
      if (!Array.isArray(config.externals)) {
        config.externals = [];
      }
      config.externals.push('mongodb');
    }
    
    return config;
  },
};

export default nextConfig;
