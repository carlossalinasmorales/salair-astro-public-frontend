/**
 * @typedef {"orbit" | "maintenance" | "prism" | "layers" | "panels"} ServiceIconVariant
 */

/**
 * @param {{ variant?: ServiceIconVariant, className?: string }} props
 */
export function ServiceOrbitIcon({ variant = "orbit", className = "" }) {
  return (
    <span
      className={`service-orbit-icon relative inline-flex h-14 w-14 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {variant === "orbit" && (
        <svg viewBox="0 0 56 56" className="h-14 w-14 text-primary-500">
          <g className="so-float so-orbit-group" transformOrigin="28 28">
            <ellipse cx="28" cy="28" rx="18" ry="10" className="so-orbit-stroke-a fill-none stroke-current" strokeWidth="1.8" />
            <ellipse cx="28" cy="28" rx="10" ry="18" className="so-orbit-stroke-b fill-none stroke-current" strokeWidth="1.6" />
            <circle cx="28" cy="28" r="2.8" className="so-orbit-core fill-primary-700" />
            <circle cx="28" cy="10" r="1.5" className="so-orbit-dot fill-primary-500" />
          </g>
        </svg>
      )}

      {variant === "maintenance" && (
        <svg viewBox="0 0 56 56" className="h-14 w-14 text-primary-500">
          <g className="so-float so-maintenance-group" transformOrigin="28 28">
            <circle cx="28" cy="28" r="11" className="so-maint-ring fill-none stroke-current" strokeWidth="1.6" />
            <path d="M18 24a10.5 10.5 0 0 1 16-6" className="so-maint-arc-a fill-none stroke-current" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 18h4.5l-1.8-3.1" className="so-maint-arc-a fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 32a10.5 10.5 0 0 1-16 6" className="so-maint-arc-b fill-none stroke-current" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 38h-4.5l1.8 3.1" className="so-maint-arc-b fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="28" r="3.2" className="so-maint-core fill-primary-700" />
          </g>
        </svg>
      )}

      {variant === "prism" && (
        <svg viewBox="0 0 56 56" className="h-14 w-14 text-primary-500">
          <g className="so-float so-prism-draw" transformOrigin="28 28">
            <path d="M28 10 43 19 28 28 13 19Z" className="so-prism-stroke-a fill-none stroke-current" strokeWidth="1.9" />
            <path d="M13 19v18l15 9 15-9V19" className="so-prism-stroke-b fill-none stroke-current" strokeWidth="1.9" />
            <path d="M28 28v18" className="so-prism-stroke-c fill-none stroke-primary-700" strokeWidth="1.4" />

            <circle cx="28" cy="10" r="1.5" className="so-prism-dot-a fill-primary-500" />
            <circle cx="43" cy="19" r="1.4" className="so-prism-dot-b fill-primary-700" />
            <circle cx="13" cy="19" r="1.3" className="so-prism-dot-c fill-primary-500" />
          </g>
        </svg>
      )}

      {variant === "layers" && (
        <svg viewBox="0 0 56 56" className="h-14 w-14 text-primary-500">
          <g className="so-float so-layers-group" transformOrigin="28 28">
            <rect x="12" y="14" width="22" height="22" className="so-layer-a fill-none stroke-current" strokeWidth="1.8" />
            <rect x="18" y="18" width="22" height="22" className="so-layer-b fill-none stroke-current" strokeWidth="1.8" />
            <rect x="24" y="22" width="22" height="22" className="so-layer-c fill-none stroke-current" strokeWidth="1.8" />
            <circle cx="42" cy="40" r="1.4" className="so-layer-dot fill-primary-700" />
          </g>
        </svg>
      )}

      {variant === "panels" && (
        <svg viewBox="0 0 56 56" className="h-14 w-14 text-primary-500">
          <g className="so-float so-panels-group" transformOrigin="28 28">
            <rect x="10" y="14" width="22" height="22" rx="1.5" className="so-panel-a fill-none stroke-current" strokeWidth="1.8" />
            <rect x="17" y="11" width="22" height="22" rx="1.5" className="so-panel-b fill-none stroke-current" strokeWidth="1.8" />
            <rect x="24" y="18" width="22" height="22" rx="1.5" className="so-panel-c fill-none stroke-current" strokeWidth="1.8" />
            <path d="M12 30h18" className="so-panel-scan fill-none stroke-primary-700" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        </svg>
      )}

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .so-float {
            animation: service-icon-float 3.6s ease-in-out infinite;
            transform-origin: center;
          }

          .so-orbit-group {
            animation: service-icon-float 3.6s ease-in-out infinite, service-icon-spin 9.5s linear infinite;
          }

          .so-orbit-stroke-a,
          .so-orbit-stroke-b {
            stroke-dasharray: 120;
            stroke-dashoffset: 0;
            animation: service-line-draw 3.2s ease-in-out infinite;
          }

          .so-orbit-stroke-b { animation-delay: 0.2s; opacity: 0.72; }
          .so-orbit-dot { animation: service-dot-pulse 1.8s ease-in-out infinite; }
          .so-orbit-core { animation: service-core-breathe 2.2s ease-in-out infinite; }

          .so-maintenance-group {
            animation: service-icon-float 3.6s ease-in-out infinite, service-icon-spin-slow 7.2s linear infinite;
          }

          .so-maint-ring { opacity: 0.35; }
          .so-maint-arc-a { opacity: 0.9; }
          .so-maint-arc-b { opacity: 0.72; }
          .so-maint-core { animation: service-core-breathe 2.2s ease-in-out infinite; }

          .so-prism-draw {
            animation: service-icon-float 3.6s ease-in-out infinite, service-prism-wobble 4.4s ease-in-out infinite;
          }

          .so-prism-stroke-a,
          .so-prism-stroke-b,
          .so-prism-stroke-c {
            stroke-dasharray: 120;
            stroke-dashoffset: 0;
            animation: service-prism-line 3.2s ease-in-out infinite;
            opacity: 0.9;
          }

          .so-prism-stroke-b { animation-delay: 0.15s; opacity: 0.75; }
          .so-prism-stroke-c { animation-delay: 0.3s; opacity: 0.6; }
          .so-prism-dot-a,
          .so-prism-dot-b,
          .so-prism-dot-c { animation: service-prism-dot 1.8s ease-in-out infinite; }
          .so-prism-dot-b { animation-delay: 0.2s; }
          .so-prism-dot-c { animation-delay: 0.4s; }

          .so-layers-group {
            animation: service-icon-float 3.6s ease-in-out infinite, service-layers-wobble 4.2s ease-in-out infinite;
          }

          .so-layer-a,
          .so-layer-b,
          .so-layer-c {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
            animation: service-line-draw 3.4s ease-in-out infinite;
          }
          .so-layer-a { animation-delay: 0s; opacity: 0.88; }
          .so-layer-b { animation-delay: 0.18s; opacity: 0.7; }
          .so-layer-c { animation-delay: 0.32s; opacity: 0.52; }
          .so-layer-dot { animation: service-dot-pulse 1.7s ease-in-out infinite; }

          .so-panels-group {
            animation: service-icon-float 3.6s ease-in-out infinite, service-panels-drift 4.6s ease-in-out infinite;
          }

          .so-panel-a,
          .so-panel-b,
          .so-panel-c {
            stroke-dasharray: 98;
            stroke-dashoffset: 0;
            animation: service-line-draw 3.6s ease-in-out infinite;
          }
          .so-panel-a { animation-delay: 0s; opacity: 0.86; }
          .so-panel-b { animation-delay: 0.2s; opacity: 0.68; }
          .so-panel-c { animation-delay: 0.36s; opacity: 0.5; }
          .so-panel-scan { animation: service-scan 2.2s ease-in-out infinite; opacity: 0.55; }
        }

        @keyframes service-icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }

        @keyframes service-icon-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes service-icon-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes service-line-draw {
          0%, 100% { stroke-dashoffset: 100; opacity: 0.45; }
          55% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes service-dot-pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes service-core-breathe {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50% { opacity: 0.95; transform: scale(1.1); }
        }

        @keyframes service-prism-wobble {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-1px); }
        }

        @keyframes service-prism-line {
          0%, 100% { stroke-dashoffset: 120; opacity: 0.45; }
          55% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes service-prism-dot {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes service-layers-wobble {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-1.7deg); }
        }

        @keyframes service-panels-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-1.4px); }
        }

        @keyframes service-scan {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-3px); opacity: 0.85; }
        }
      `}</style>
    </span>
  );
}

export default ServiceOrbitIcon;
