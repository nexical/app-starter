import { defineConfig } from 'vitest/config';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreDir = path.resolve(__dirname, '../../core');

export default defineConfig({
    plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] })],
    test: {
        environment: 'node',
        globals: true,
        setupFiles: [path.resolve(coreDir, './tests/unit/setup.ts')],
        include: [
            'modules/**/tests/unit/**/*.test.{ts,tsx}',
        ],
        exclude: ['**/node_modules/**', '**/dist/**'],
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: [
                'modules/*/src/**/*.ts',
                'modules/*/src/**/*.tsx',
            ],
            exclude: [
                'modules/**/pages/api/**',
                'modules/**/services/**',
                'modules/**/sdk/**',
                '**/index.ts',
                '**/types.ts',
                '**/contracts.ts',
                '**/middleware.ts',
                '**/server-init.ts',
            ],
        },
        testTimeout: 30000,
    },
    resolve: {
        alias: {
            '@': path.resolve(coreDir, 'src'),
            '@modules': path.resolve(__dirname, 'modules'),
            '@tests': path.resolve(coreDir, 'tests'),
            'astro:middleware': path.resolve(coreDir, 'tests/unit/mocks/astro.ts'),
            'astro:actions': path.resolve(coreDir, 'tests/unit/mocks/astro.ts'),
            'astro:schema': path.resolve(coreDir, 'tests/unit/mocks/astro.ts'),
        },
    },
});
