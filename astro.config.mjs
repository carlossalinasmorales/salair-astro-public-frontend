// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const TURNSTILE_ORIGIN = 'https://challenges.cloudflare.com';

const resolveFormsApiOrigin = () => {
  const formsApiBaseUrl = process.env.PUBLIC_FORMS_API_BASE_URL;
  if (!formsApiBaseUrl) {
    return null;
  }

  try {
    return new URL(formsApiBaseUrl).origin;
  } catch {
    return null;
  }
};

const formsApiOrigin = resolveFormsApiOrigin();
const connectSrcResources = ["'self'", TURNSTILE_ORIGIN];

if (formsApiOrigin) {
  connectSrcResources.push(formsApiOrigin);
}

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
        `connect-src ${connectSrcResources.join(' ')}`,
        `frame-src ${TURNSTILE_ORIGIN}`,
      ],
      scriptDirective: {
        resources: ["'self'", TURNSTILE_ORIGIN],
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

  integrations: [react(), sitemap()],
});
