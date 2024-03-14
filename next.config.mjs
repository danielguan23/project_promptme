/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
    headers: () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ],
  };
  
  export default nextConfig;