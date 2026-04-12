export type ServiceIconVariant = "orbit" | "maintenance" | "prism" | "layers" | "panels";

export interface ServiceOrbitIconProps {
  variant?: ServiceIconVariant;
  className?: string;
}

export function ServiceOrbitIcon({ variant = "orbit", className = "" }: ServiceOrbitIconProps) {
  return (
    <span
      className={`service-orbit-icon relative inline-flex h-14 w-14 md:h-18 md:w-18 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {variant === "orbit" && (
        <svg viewBox="0 0 56 56" className=" text-primary-500">
          <g className="so-float so-orbit-group">
            <ellipse cx="28" cy="28" rx="18" ry="10" className="so-orbit-stroke-a fill-none stroke-current" strokeWidth="1.8" />
            <ellipse cx="28" cy="28" rx="10" ry="18" className="so-orbit-stroke-b fill-none stroke-current" strokeWidth="1.6" />
            <circle cx="28" cy="28" r="2.8" className="so-orbit-core fill-primary-700" />
            <circle cx="28" cy="10" r="1.5" className="so-orbit-dot fill-primary-500" />
          </g>
        </svg>
      )}

      {variant === "maintenance" && (
        <svg viewBox="0 0 56 56" className=" text-primary-500">
          <g className="so-float so-maintenance-group">
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
        <svg viewBox="0 0 56 56" className=" text-primary-500">
          <g className="so-float so-prism-draw">
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
        <svg viewBox="0 0 56 56" className=" text-primary-500">
          <g className="so-float so-layers-group">
            <rect x="12" y="14" width="22" height="22" className="so-layer-a fill-none stroke-current" strokeWidth="1.8" />
            <rect x="18" y="18" width="22" height="22" className="so-layer-b fill-none stroke-current" strokeWidth="1.8" />
            <rect x="24" y="22" width="22" height="22" className="so-layer-c fill-none stroke-current" strokeWidth="1.8" />
            <circle cx="42" cy="40" r="1.4" className="so-layer-dot fill-primary-700" />
          </g>
        </svg>
      )}

      {variant === "panels" && (
        <svg viewBox="0 0 56 56" className=" text-primary-500">
          <g className="so-float so-panels-group">
            <rect x="10" y="14" width="22" height="22" rx="1.5" className="so-panel-a fill-none stroke-current" strokeWidth="1.8" />
            <rect x="17" y="11" width="22" height="22" rx="1.5" className="so-panel-b fill-none stroke-current" strokeWidth="1.8" />
            <rect x="24" y="18" width="22" height="22" rx="1.5" className="so-panel-c fill-none stroke-current" strokeWidth="1.8" />
            <path d="M12 30h18" className="so-panel-scan fill-none stroke-primary-700" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        </svg>
      )}
    </span>
  );
}

export default ServiceOrbitIcon;
