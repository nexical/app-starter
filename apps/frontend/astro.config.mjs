import { defineConfig } from 'astro/config';
import { defu } from 'defu';
import cloudflare from '@astrojs/cloudflare';
import baseConfig from '../../core/astro.config.mjs';

export default defineConfig(defu({
    output: 'static',
    adapter: cloudflare({
        imageService: 'compile',
        platformProxy: { enabled: true },
    }),
}, baseConfig));
