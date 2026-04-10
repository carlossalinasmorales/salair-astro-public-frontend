import degasaLogo from "@assets/images/empresas/degasa.webp";
import kfcLogo from "@assets/images/empresas/kfc.webp";
import unoSaludLogo from "@assets/images/empresas/uno-salud.webp";

export interface TestimonialItem {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  role: string;
  location: string;
}

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Llevamos años trabajando con Salair en el mantenimiento de nuestros equipos tanto en KFC, Wendy's y China Wok. Su equipo técnico es confiable, siempre disponible y nos ha ayudado a evitar paradas críticas en nuestra operación.",
    name: "Nicolas Rojas",
    company: "Degasa",
    avatar: degasaLogo.src,
    role: "Gerente de Operaciones",
    location: "Chile",
  },
  {
    quote:
      "SALAIR lleva años cubriendo nuestros mas de  120 locales a lo largo de Chile siendo una parte importante en la continuidad operativa de nuestros restaurantes.",
    name: "Francisco Beque",
    company: "KFC Chile",
    avatar: kfcLogo.src,
    role: "Jefe de Mantenciones",
    location: "Chile",
  },
  {
    quote:
      "SALAIR se ha hecho cargo de las isntalaciones de cliatización de nuestros centros médicos, brindándonos tranquilidad y respaldo técnico para mantener un ambiente seguro y confortable para nuestros pacientes y personal.",
    name: "Bernabé Calderón",
    company: "Uno Salud",
    avatar: unoSaludLogo.src,
    role: "Jefe de Operaciones",
    location: "Chile",
  },
];
