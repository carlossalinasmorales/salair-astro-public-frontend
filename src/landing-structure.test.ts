import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = process.cwd();

const readSource = (relativePath: string) => {
  const absolutePath = resolve(projectRoot, relativePath);
  return readFileSync(absolutePath, 'utf8');
};

describe('landing pública: estructura crítica', () => {
  it('index.astro mantiene componentes críticos (Header, Hero, Services, Contact, Footer)', () => {
    const indexSource = readSource('src/pages/index.astro');

    const criticalSections = ['Header', 'Hero', 'ServicesSection', 'ContactSection', 'Footer'];

    for (const section of criticalSections) {
      expect(indexSource).toContain(`<${section}`);
    }
  });

  it('index.astro conserva el orden base del flujo de la landing', () => {
    const indexSource = readSource('src/pages/index.astro');

    const headerIndex = indexSource.indexOf('<Header');
    const heroIndex = indexSource.indexOf('<Hero');
    const servicesIndex = indexSource.indexOf('<ServicesSection');
    const contactIndex = indexSource.indexOf('<ContactSection');
    const footerIndex = indexSource.indexOf('<Footer');

    expect(headerIndex).toBeGreaterThanOrEqual(0);
    expect(heroIndex).toBeGreaterThan(headerIndex);
    expect(servicesIndex).toBeGreaterThan(heroIndex);
    expect(contactIndex).toBeGreaterThan(servicesIndex);
    expect(footerIndex).toBeGreaterThan(contactIndex);
  });

  it('Hero mantiene CTAs clave hacia #contacto y #servicios', () => {
    const heroSource = readSource('src/components/sections/Hero.astro');

    expect(heroSource).toContain('href="#contacto"');
    expect(heroSource).toContain('href="#servicios"');
  });

  it('el componente de logos de empresas existe y está integrado en la landing', () => {
    const marqueePath = resolve(
      projectRoot,
      'src/components/organisms/TrustedCompaniesMarquee.astro',
    );
    expect(existsSync(marqueePath)).toBe(true);

    const indexSource = readSource('src/pages/index.astro');
    const heroSource = readSource('src/components/sections/Hero.astro');
    const isIntegrated =
      indexSource.includes('<TrustedCompaniesMarquee') ||
      heroSource.includes('<TrustedCompaniesMarquee');

    expect(isIntegrated).toBe(true);
  });
});
