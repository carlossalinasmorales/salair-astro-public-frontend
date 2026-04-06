import { useMemo, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsCarouselIsland({ testimonials }: Props) {
  const safeTestimonials = useMemo(() => testimonials.filter((item) => item.quote && item.name), [testimonials]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (safeTestimonials.length === 0) {
    return null;
  }

  const current = safeTestimonials[activeIndex];

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % safeTestimonials.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length);
  };

  return (
    <section
      className="rounded-2xl border border-secondary-200/80 bg-white p-6 shadow-[0_14px_28px_-22px_rgba(9,26,56,0.65)] sm:p-8"
      aria-label="Carrusel de testimonios de clientes"
    >
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-secondary-500">Caso {activeIndex + 1} de {safeTestimonials.length}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-secondary-200 text-secondary-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100"
            aria-label="Ver testimonio anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-secondary-200 text-secondary-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100"
            aria-label="Ver siguiente testimonio"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      <article className="rounded-2xl border border-secondary-200/70 bg-white/90 p-6" aria-live="polite">
        <blockquote className="text-sm text-secondary-300 sm:text-base">“{current.quote}”</blockquote>

        <div className="mt-6 flex items-center gap-4 border-t border-secondary-200 pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 text-sm font-bold text-white">
            {current.avatar}
          </div>
          <div>
            <p className="text-sm font-bold text-secondary-500">{current.name}</p>
            <p className="text-xs text-secondary-300">{current.role}</p>
            <p className="text-xs font-semibold text-primary-600">{current.company}</p>
            <p className="text-xs text-secondary-300">{current.location}</p>
          </div>
        </div>
      </article>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Seleccionar testimonio">
        {safeTestimonials.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 ${
                isActive
                  ? "border-primary-500 bg-primary-100 text-primary-700"
                  : "border-secondary-200 text-secondary-500 hover:bg-neutral-100"
              }`}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Ir al testimonio de ${item.name}`}
            >
              {item.company}
            </button>
          );
        })}
      </div>
    </section>
  );
}
