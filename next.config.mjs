import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    // Keep build memory under the 8 GB build machine limit (Amplify Standard)
    turbopackFileSystemCacheForBuild: false,
    cpus: 2,
    turbopackSourceMaps: false,
    // Amplify SSR compute has 1 GB; preloading every route at startup exhausts it
    preloadEntriesOnStart: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dyz1pdcuffwr5.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dbqnpc1d9lg0s.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
  // SVGR: `import Icon from './icon.svg'` gives a React component (animatable
  // with GSAP/refs); append `?url` to the import path to get the asset URL
  // instead (e.g. for <Image src>). Configured for both bundlers since
  // `next dev`/`next build` default to Turbopack but `next.config.mjs`'s
  // `webpack()` hook still runs for anyone building with classic webpack.
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(webpackConfig) {
    const fileLoaderRule = webpackConfig.module.rules.find((rule) => rule.test?.test?.('.svg'));

    webpackConfig.module.rules.push(
      // Keep the default asset loader available for `*.svg?url` imports.
      { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
      // Everything else becomes a React component.
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return webpackConfig;
  },
};

export default withMDX(config);
