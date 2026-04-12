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
- **GSAP 3** (animaciones puntuales)
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
    organisms/           # bloques compuestos reutilizables (Header, Footer, islands puntuales)
    sections/            # secciones completas de página/landing
    illustrations/       # ilustraciones SVG/React con estilos compartidos de dominio
  layouts/               # layout base y metadata global
  pages/                 # páginas Astro
  styles/                # tokens, patrones semánticos y estilos por dominio
```

## Convenciones del frontend

- Arquitectura de componentes por **Atomic Design**.
- Mantener componentes reutilizables en `atoms/` y `molecules/`; reservar `sections/` para composición de secciones de página.
- `organisms/` se usa para bloques compuestos reutilizables, no como sinónimo de secciones completas.
- Se usan aliases para importaciones limpias (`@`, `@atoms`, `@molecules`, `@organisms`, `@assets`, etc.).
- Las imágenes deben usar `astro:assets` (`<Image />`) para mantener optimización y consistencia.

## Arquitectura y convenciones de estilos

### `src/styles/global.css`
- Tokens de tema (`@theme`) y reglas base de elementos.
- Defaults de accesibilidad a nivel de elemento.
- No agregar aquí patrones reutilizables de UI ni estilos específicos de feature/dominio.

### `src/styles/patterns.css`
- Patrones semánticos reutilizables construidos con `@apply`.
- Ejemplos: shells de secciones, títulos, superficies compartidas, controles comunes y helpers de layout.
- Preferir este archivo por sobre crear archivos `*.ts` que solo exportan strings de clases Tailwind.

### `src/styles/domains/*.css`
- CSS transversal para un dominio visual/funcional específico.
- Usarlo cuando los estilos se comparten entre múltiples componentes y no corresponde llevarlos a `global.css`.
- Ejemplo actual: `src/styles/domains/illustrations.css`.

### Estilos locales por componente
- Preferir `<style>` dentro de componentes `.astro` cuando el CSS pertenece a un único componente.
- Evitar archivos CSS standalone por componente salvo que exista una necesidad clara de reutilización.

### Nota para React/JSX (CSP)
- No incrustar bloques `<style>{...}</style>` dentro de componentes JSX bajo CSP.
- Mover ese CSS a un stylesheet de dominio o al stylesheet de un componente Astro, según corresponda.

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
- `src/content.config.ts` está como placeholder técnico para evitar warnings de Astro Content (no hay collections activas por ahora).
