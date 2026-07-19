import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BASE_PATH } from './base-path.mjs';

export default defineConfig({
  // Assets are served from the same subpath as the routes.
  base: `${BASE_PATH}/`,
  plugins: [reactRouter(), tsconfigPaths()],
});
