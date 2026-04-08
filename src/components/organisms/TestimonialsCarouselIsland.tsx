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
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const testimonialsLength = safeTestimonials.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength]);

  const goPrev = useCallback(() => {
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

  const getSignedDistance = (index: number) => {
    let distance = index - activeIndex;

    if (distance > testimonialsLength / 2) {
      distance -= testimonialsLength;
    }

    if (distance < -testimonialsLength / 2) {
      distance += testimonialsLength;
    }

    return distance;
  };

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
      className="mx-auto w-full max-w-6xl"
      aria-label="Carrusel de testimonios de clientes"
    >
      <div
        className="relative overflow-hidden py-1"
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-linear-to-r from-neutral-100 via-neutral-100/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-linear-to-l from-neutral-100 via-neutral-100/70 to-transparent" />

        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="relative grid">
          {safeTestimonials.map((testimonial, index) => {
            const distance = getSignedDistance(index);
            const isCenter = distance === 0;
            const isLeft = distance === -1;
            const isRight = distance === 1;
            const isVisible = Math.abs(distance) <= 1;

            return (
              <article
                key={`${testimonial.name}-${index}`}
                aria-hidden={!isCenter}
                aria-live={isCenter ? "polite" : undefined}
                className={`col-start-1 row-start-1 w-[84%] justify-self-center rounded-sm border border-secondary-300/20 bg-neutral-100 p-6 text-secondary-500 sm:w-[78%] md:w-[68%] md:p-7 ${
                  prefersReducedMotion ? "" : "transition-all duration-500 ease-out"
                } ${
                  isCenter
                    ? "z-30 scale-100 opacity-100"
                    : isLeft
                    ? "z-10 -translate-x-[56%] scale-95 opacity-35"
                    : isRight
                    ? "z-10 translate-x-[56%] scale-95 opacity-35"
                    : "z-0 scale-90 opacity-0"
                } ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <blockquote className="text-sm leading-relaxed text-secondary-400 sm:text-base">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-6 flex items-center gap-4 border-t border-secondary-200 pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 text-sm font-bold text-neutral-100">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary-500">{testimonial.name}</p>
                    <p className="text-xs text-secondary-400">{testimonial.role}</p>
                    <p className="text-xs font-semibold text-primary-600">{testimonial.company}</p>
                    <p className="text-xs text-secondary-300">{testimonial.location}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-5 hidden items-center justify-center md:flex">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            onFocus={() => setIsAutoplayPaused(true)}
            onBlur={() => setIsAutoplayPaused(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-secondary-300 bg-white text-secondary-500 hover:bg-secondary-500 hover:text-neutral-100 transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Ver testimonio anterior"
          >
            <span aria-hidden="true" className="text-xl leading-none ">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={goNext}
            onFocus={() => setIsAutoplayPaused(true)}
            onBlur={() => setIsAutoplayPaused(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-secondary-300 bg-white text-secondary-500 hover:bg-secondary-500 hover:text-neutral-100 transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Ver siguiente testimonio"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ›
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
