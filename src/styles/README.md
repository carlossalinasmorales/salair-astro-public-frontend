# Style conventions

## `global.css`
- Theme tokens and `@theme`
- Base element rules
- Element-level accessibility defaults
- Never add reusable UI patterns or feature/domain-specific CSS here

## `patterns.css`
- Reusable semantic UI patterns built with `@apply`
- Examples: section shells, section titles, shared surfaces, common form controls, layout helpers
- Prefer this over tiny `*.ts` files that only export Tailwind class strings

## `domains/*.css`
- Cross-component CSS for one visual/functional domain
- Use when styles are shared by multiple components but do not belong in `global.css`
- Current example: `domains/illustrations.css`

## Component-local styles
- Prefer `<style>` inside `.astro` components when the CSS belongs to one component only
- Avoid per-component standalone CSS files by default

## React/JSX caveat
- Do not embed `<style>{`...`}</style>` in JSX components under CSP
- Move that CSS to a domain stylesheet or to an Astro component stylesheet instead
