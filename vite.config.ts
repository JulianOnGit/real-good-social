import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BASE_PATH } from './base-path.mjs';

export default defineConfig({
  // Assets are served from the same subpath as the routes.
  base: `${BASE_PATH}/`,
  plugins: [reactRouter(), tsconfigPaths()],
  build: {
    // The 1x logo is small enough to be inlined as base64, which would repeat
    // it in every page's HTML (header + footer, `src` + `srcSet`). Keep it a file.
    assetsInlineLimit: (filePath) => (filePath.includes('logo-mark') ? false : undefined),
  },
});
