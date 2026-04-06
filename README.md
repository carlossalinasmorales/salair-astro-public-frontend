# Salair Public Frontend (Astro)

Landing pública de **SALAIR** construida con Astro, Tailwind y componentes bajo enfoque **Atomic Design**.

## Objetivo del proyecto

Este repositorio concentra el frontend del sitio público, con foco en:

- rendimiento y SEO técnico,
- diseño consistente por sistema de componentes,
- contenido comercial claro y mantenible.

## Stack

- **Astro 6**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **React 19** (islands puntuales)
- **Vitest** para pruebas
- **Node.js >= 22.12.0**

## Requisitos

- Node.js `>=22.12.0`
- npm

## Instalación y uso

```bash
npm install
npm run dev
```

### Scripts disponibles

- `npm run dev` — entorno local
- `npm run build` — build de producción
- `npm run preview` — preview del build
- `npm run test` — vitest en modo interactivo
- `npm run test:run` — ejecución única de tests
- `npm run test:watch` — tests en watch mode

## Estructura del proyecto

```text
src/
  assets/                # imágenes, logos, videos e identidad
  components/
    atoms/               # piezas base (Button, Icon, Logo, SurfaceCard, etc.)
    molecules/           # combinaciones reutilizables (ServiceCard, WorkAreaCard, SectionHeading, etc.)
    organisms/           # secciones completas de la landing
  layouts/               # layout base y metadata global
  pages/                 # páginas Astro
  styles/                # estilos globales y tokens
```

## Convenciones del frontend

- Arquitectura de componentes por **Atomic Design**.
- Mantener componentes reutilizables en `atoms/` y `molecules/`; evitar markup complejo inline en organismos.
- Se usan aliases para importaciones limpias (`@`, `@atoms`, `@molecules`, `@organisms`, `@assets`, etc.).
- Las imágenes deben usar `astro:assets` (`<Image />`) para mantener optimización y consistencia.

## SEO y configuración relevante

- Dominio canónico configurado en `astro.config.mjs`:
  - `site: https://www.salair.cl`
- Integración de sitemap habilitada con `@astrojs/sitemap`.
- Metadata base y estructura SEO centralizadas en `src/layouts/Layout.astro`.

## Testing

Las pruebas actuales validan estructura crítica de la landing (orden de secciones y presencia de componentes clave):

```bash
npm run test:run
```

## Notas

- Este proyecto prioriza claridad operativa y mantenibilidad del contenido.
- Si agregás nuevas secciones, respetá naming y jerarquía de componentes para no degradar el sistema.
