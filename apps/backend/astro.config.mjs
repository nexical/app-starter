import { defineConfig } from 'astro/config';
import { defu } from 'defu';
import node from '@astrojs/node';
import baseConfig from '../../core/astro.config.mjs';

export default defineConfig(defu({
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
}, baseConfig));
