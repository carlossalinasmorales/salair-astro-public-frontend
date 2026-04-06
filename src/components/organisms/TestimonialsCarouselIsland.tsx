import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";

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
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const testimonialsLength = safeTestimonials.length;

  const goNext = useCallback(() => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength]);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength]);

  useEffect(() => {
    if (testimonialsLength === 0) {
      return;
    }

    setActiveIndex((prev) => (prev >= testimonialsLength ? 0 : prev));
  }, [testimonialsLength]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (testimonialsLength < 2 || isAutoplayPaused || prefersReducedMotion) {
      return;
    }

    const AUTOPLAY_MS = 4800;
    const intervalId = window.setInterval(goNext, AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [testimonialsLength, isAutoplayPaused, prefersReducedMotion, goNext]);

  if (safeTestimonials.length === 0) {
    return null;
  }

  const current = safeTestimonials[activeIndex];

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const touchStartX = touchStartXRef.current;

    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - touchEndX;
    const SWIPE_THRESHOLD = 40;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartXRef.current = null;
  };

  return (
    <section
      className="rounded-2xl  bg-white md:mx-auto md:max-w-3xl"
      aria-label="Carrusel de testimonios de clientes"
    >
      <div className="relative">
        <button
          type="button"
          onClick={goPrev}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onFocus={() => setIsAutoplayPaused(true)}
          onBlur={() => setIsAutoplayPaused(false)}
          className="absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-secondary-200 bg-white text-secondary-500 shadow-[0_14px_26px_-24px_rgba(9,26,56,0.7)] transition-colors hover:border-primary-300 hover:bg-primary-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 md:-left-10 md:inline-flex lg:-left-14"
          aria-label="Ver testimonio anterior"
        >
          <span aria-hidden="true">←</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onFocus={() => setIsAutoplayPaused(true)}
          onBlur={() => setIsAutoplayPaused(false)}
          className="absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-secondary-200 bg-white text-secondary-500 shadow-[0_14px_26px_-24px_rgba(9,26,56,0.7)] transition-colors hover:border-primary-300 hover:bg-primary-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 md:-right-10 md:inline-flex lg:-right-14"
          aria-label="Ver siguiente testimonio"
        >
          <span aria-hidden="true">→</span>
        </button>

        <article
          key={`${current.name}-${activeIndex}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`${
            prefersReducedMotion
              ? ""
              : direction === "next"
              ? "animate-[testimonialSlideInFromRight_760ms_cubic-bezier(0.16,1,0.3,1)]"
              : "animate-[testimonialSlideInFromLeft_760ms_cubic-bezier(0.16,1,0.3,1)]"
          } rounded-2xl border border-secondary-200 bg-neutral-100 p-6 md:mx-8 lg:mx-10`}
          aria-live="polite"
        >
          <blockquote className="text-sm text-secondary-300 sm:text-base">“{current.quote}”</blockquote>

          <div className="mt-6 flex items-center gap-4 border-t border-secondary-200 pt-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 text-sm font-bold text-white shadow-[0_12px_24px_-16px_rgba(9,26,56,0.9)]">
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
      </div>

      <style>{`
        @keyframes testimonialSlideInFromRight {
          from {
            opacity: 0.25;
            transform: translateX(128px) scale(0.98);
            filter: blur(1.5px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes testimonialSlideInFromLeft {
          from {
            opacity: 0.25;
            transform: translateX(-128px) scale(0.98);
            filter: blur(1.5px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
