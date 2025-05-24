/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Disable ESLint build errors temporarily
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;