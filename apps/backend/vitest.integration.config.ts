import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreDir = path.resolve(__dirname, '../../core');

export default defineConfig({
    plugins: [react(), tsconfigPaths({ projects: [path.resolve(__dirname, 'tsconfig.json')] })],
    root: __dirname,
    test: {
        fileParallelism: false,
        environment: 'node',
        globals: true,
        setupFiles: [
            path.resolve(coreDir, './tests/integration/env-setup.ts'),
            path.resolve(coreDir, './tests/integration/setup.ts'),
        ],
        include: [
            'modules/**/tests/integration/**/*.test.{ts,tsx}',
        ],
        exclude: ['**/node_modules/**', '**/dist/**'],
        testTimeout: 120000,
        hookTimeout: 120000,
        pool: 'forks',
    },
    resolve: {
        alias: {
            'astro:schema': 'zod',
            '@tests': path.resolve(coreDir, './tests'),
            '@modules': path.resolve(__dirname, './modules'),
            '@': path.resolve(coreDir, './src'),
        },
    },
});
