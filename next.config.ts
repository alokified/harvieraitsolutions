import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  // Enable Turbopack explicitly
  turbopack: {},
};

export default withContentlayer(nextConfig);
