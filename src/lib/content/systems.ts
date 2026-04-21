import type { ImageMetadata } from 'astro';

import aireAcondicionadoIndustrial from '@/assets/images/equipos/aire-acondicionado-industrial.webp';
import camarasDeRefrigeracion from '@/assets/images/equipos/camaras-de-refrigeracion.webp';
import camarasDeCongelado from '@/assets/images/equipos/camaras-de-congelado.webp';
import ductosDeVentilacion from '@/assets/images/equipos/ductos-de-ventilacion.webp';
import extractoresDeAire from '@/assets/images/equipos/extractores-de-aire.webp';

export interface SystemItem {
  title: string;
  description: string;
  image: ImageMetadata;
  alt: string;
}

export const systems: SystemItem[] = [
  {
    title: 'Aires acondicionados',
    description:
      'Climatización para espacios comerciales e industriales con control térmico estable y continuidad operativa.',
    image: aireAcondicionadoIndustrial,
    alt: 'Equipo de aire acondicionado industrial',
  },
  {
    title: 'Cámaras de mantención',
    description:
      'Refrigeración para conservación de productos con monitoreo térmico constante y funcionamiento confiable.',
    image: camarasDeRefrigeracion,
    alt: 'Cámara de mantención frigorífica',
  },
  {
    title: 'Cámaras de congelado',
    description:
      'Cadena de frío de baja temperatura para operaciones con alta exigencia sanitaria y logística.',
    image: camarasDeCongelado,
    alt: 'Cámara de congelado industrial',
  },
  {
    title: 'Ductería',
    description:
      'Diseño e instalación de ductos para ventilación y climatización con distribución de aire eficiente.',
    image: ductosDeVentilacion,
    alt: 'Sistema de ductería de ventilación',
  },
  {
    title: 'Extractores de aire',
    description:
      'Extracción y renovación de aire para áreas productivas con alta carga térmica y contaminantes.',
    image: extractoresDeAire,
    alt: 'Extractores de aire instalados en operación',
  },
];
