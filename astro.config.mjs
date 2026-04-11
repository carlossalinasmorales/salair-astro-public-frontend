// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: ajustar este dominio si cambia el dominio canónico del sitio.
  site: 'https://www.salair.cl',

  markdown: {
    syntaxHighlight: false,
  },

  security: {
    checkOrigin: true,
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "connect-src 'self'",
      ],
      scriptDirective: {
        resources: ["'self'"],
      },
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },

  // Evita requests de sourcemaps del dev toolbar en desarrollo.
  devToolbar: {
    enabled: false,
  },

  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Montserrat",
    cssVariable: "--font-montserrat",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  }],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        '@styles': new URL('./src/styles', import.meta.url).pathname,
        '@atoms': new URL('./src/components/atoms', import.meta.url).pathname,
        '@molecules': new URL('./src/components/molecules', import.meta.url).pathname,
        '@organisms': new URL('./src/components/organisms', import.meta.url).pathname,
        '@sections': new URL('./src/components/sections', import.meta.url).pathname,
        '@assets': new URL('./src/assets', import.meta.url).pathname,
      },
    },
  },

  integrations: [react(), sitemap()]
});
