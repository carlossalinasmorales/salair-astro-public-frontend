# Guía de mantenimiento — Salair Public Frontend

Esta guía define un flujo práctico para mantener el proyecto de forma consistente, sin degradar arquitectura, estilos ni calidad técnica.

## 1) Preparar entorno local

1. Verifica versión de Node.js (requisito: `>=22.12.0`).
2. Instala dependencias:

   ```bash
   npm install
   ```

3. Levanta el proyecto en desarrollo:

   ```bash
   npm run dev
   ```

## 2) Flujo diario recomendado

1. Crea o actualiza tu rama de trabajo.
2. Implementa cambios pequeños y enfocados (contenido, estilos, componentes o scripts).
3. Valida calidad antes de commitear (sección 6).
4. Haz commit con mensaje claro y orientado a intención.

## 3) Mantenimiento de contenido

El contenido principal de la landing está centralizado en:

- `src/lib/content/benefits.ts`
- `src/lib/content/services.ts`
- `src/lib/content/stats.ts`
- `src/lib/content/systems.ts`
- `src/lib/content/testimonials.ts`

Pasos:

1. Edita el archivo de contenido correspondiente.
2. Revisa que no se rompa la semántica de cada bloque (títulos, descripciones, CTAs).
3. Confirma que los componentes que consumen ese contenido no requieran ajustes de estructura.
4. Ejecuta tests para validar estructura crítica de la landing.

## 4) Cambios de estilos e ilustraciones

Usa esta jerarquía para decidir DÓNDE tocar estilos:

1. **Estilo global/base** → `src/styles/global.css`
2. **Patrón reutilizable** (superficies, títulos, shells, etc.) → `src/styles/patterns.css`
3. **Estilo transversal por dominio visual** → `src/styles/domains/*.css`
4. **Estilo puntual de un componente Astro** → bloque `<style>` en el propio componente `.astro`

Para ilustraciones y assets visuales:

- Ilustraciones React/SVG compartidas: `src/components/illustrations/`
- Assets de marca e identidad: `src/assets/`

## 5) Cambios de componentes y estructura

Respetar arquitectura Atomic Design:

- `atoms/`: piezas mínimas reutilizables
- `molecules/`: combinación de átomos
- `organisms/`: bloques compuestos reutilizables
- `sections/`: secciones completas de la landing

Regla práctica:

- Si es estático, mantener en `.astro`.
- Si es interactivo reutilizable, evaluar island de React.
- Si es interacción puntual, ubicar lógica en `src/scripts/`.

## 6) Validación antes de commit

Ejecuta SIEMPRE estos comandos antes de commitear:

```bash
npm run lint
npm run format:check
npm run test:run
```

Si necesitas corregir formato/lint de manera automática:

```bash
npm run lint:fix
npm run format
```

> Evita commitear cambios sin esta validación previa.

## 7) Revisión funcional mínima

Con `npm run dev` activo:

1. Revisa Hero, Services y Contact en la home.
2. Verifica enlaces internos (`#servicios`, `#contacto`) y navegación principal.
3. Revisa footer y consistencia visual en secciones afectadas.
4. Si tocaste SEO/layout, valida metadata base en `src/layouts/Layout.astro`.

## 8) Dependencias y salud del proyecto

- Dependabot está configurado en `.github/dependabot.yml`.
- Cuando actualices dependencias manualmente:
  1. Actualiza paquete específico.
  2. Ejecuta lint + format check + tests.
  3. Revisa posibles cambios de configuración (Astro, React, Tailwind, ESLint, Vitest).

## 9) Checklist rápido pre-PR

- [ ] Cambios acotados y con propósito claro
- [ ] Estructura Atomic Design respetada
- [ ] Estilos ubicados en la capa correcta
- [ ] `npm run lint` sin errores
- [ ] `npm run format:check` sin cambios pendientes
- [ ] `npm run test:run` en verde
- [ ] README/docs actualizados si cambió el flujo del proyecto
