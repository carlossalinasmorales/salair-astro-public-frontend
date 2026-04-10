export interface ServiceItem {
  iconVariant: "orbit" | "maintenance" | "prism" | "layers" | "panels";
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    iconVariant: "prism",
    title: "Instalaciones",
    description:
      "Implementamos sistemas de climatización y refrigeración con puesta en marcha en terreno y verificación de funcionamiento.",
  },
  {
    iconVariant: "layers",
    title: "Reparaciones",
    description:
      "Diagnosticamos y resolvemos fallas en equipos de climatización y refrigeración industrial para reducir detenciones y recuperar operación segura.",
  },
  {
    iconVariant: "maintenance",
    title: "Mantenciones",
    description:
      "Ejecutamos mantenciones preventivas y correctivas para extender la vida útil de los equipos y evitar fallas repetitivas.",
  },
  {
    iconVariant: "orbit",
    title: "Emergencias",
    description:
      "Respondemos contingencias críticas con atención prioritaria y reporte claro de lo ejecutado en cada intervención.",
  },
  {
    iconVariant: "panels",
    title: "Proyectos",
    description:
      "Desarrollamos proyectos de climatización y refrigeración industrial desde la definición técnica hasta la implementación y entrega operativa.",
  },
];
