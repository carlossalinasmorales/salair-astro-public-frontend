# Salair Public Frontend

Landing pública de **SALAIR** construida con Astro, Tailwind y arquitectura de componentes basada en **Atomic Design**.

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.12.0-339933?logo=node.js&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=1A2B34)

## Objetivo

Este repositorio concentra el frontend del sitio público con foco en:

- rendimiento y SEO técnico,
- consistencia visual vía sistema de componentes,
- mantenibilidad operativa del contenido y estilos.

## Requisitos

- Node.js `>=22.12.0`
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

## Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Levanta el entorno local de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Sirve localmente el build generado |
| `npm run lint` | Ejecuta ESLint en todo el proyecto |
| `npm run lint:fix` | Corrige automáticamente problemas de lint soportados |
| `npm run format` | Formatea el proyecto con Prettier |
| `npm run format:check` | Verifica formato sin modificar archivos |
| `npm run test` | Ejecuta Vitest en modo interactivo |
| `npm run test:run` | Ejecuta tests una sola vez |
| `npm run test:watch` | Ejecuta tests en modo watch |

## Estructura del proyecto

```text
src/
  assets/                # imágenes, logos, videos e identidad
  components/
    atoms/               # piezas base (Button, NavLink, Logo)
    molecules/           # combinaciones reutilizables (cards, campos de formulario)
    organisms/           # bloques compuestos reutilizables (Header, Footer, marquee, islands)
    sections/            # secciones completas de la landing
    illustrations/       # ilustraciones SVG/React compartidas
  layouts/               # layout base y metadata global
  lib/content/           # contenido comercial centralizado (servicios, beneficios, stats, etc.)
  lib/navigation/        # enlaces de navegación y footer
  pages/                 # rutas Astro
  scripts/               # comportamiento cliente puntual por sección/página
  styles/                # tokens, patrones semánticos y estilos por dominio
```

## Convenciones clave

- Mantener la jerarquía **Atomic Design** (`atoms` → `molecules` → `organisms` → `sections`).
- Si algo es estático, debe permanecer en `.astro` sin JS cliente.
- Si algo es interactivo y reutilizable, evaluar island de React.
- Si la interacción es puntual de una sola sección, ubicarla en `src/scripts/`.
- Usar alias definidos en `astro.config.mjs` (`@`, `@atoms`, `@molecules`, `@organisms`, `@assets`, etc.).

## Estilos

- `src/styles/global.css`: tema/base y reglas globales.
- `src/styles/patterns.css`: patrones semánticos reutilizables (`@apply`).
- `src/styles/domains/*.css`: estilos transversales por dominio visual.

> Bajo CSP, evita `<style>{...}</style>` embebido en JSX. Mueve ese CSS a estilos de dominio o a un componente `.astro`.

## SEO, seguridad y configuración

- Dominio canónico: `https://www.salair.cl` (`astro.config.mjs`).
- Sitemap habilitado con `@astrojs/sitemap`.
- Metadata principal en `src/layouts/Layout.astro`.
- CSP configurada en `astro.config.mjs` para endurecer seguridad de recursos.

## Testing

Las pruebas actuales validan estructura crítica de la landing (orden de secciones, presencia de bloques clave y CTAs principales).

```bash
npm run test:run
```

## Mantenimiento del proyecto

Guía operativa paso a paso:

- [`MAINTENANCE.md`](MAINTENANCE.md)

## Nota sobre licencia

Actualmente no hay archivo `LICENSE` en el repositorio. Antes de abrir el proyecto a terceros, define y agrega una licencia explícita.
