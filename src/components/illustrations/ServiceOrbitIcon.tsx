import "@styles/domains/service-orbit-icon.css";

export type ServiceIconVariant =
  | "cooling"
  | "heating"
  | "compressor"
  | "thermostat"
  | "ventilation"
  | "heatpump";

export interface ServiceOrbitIconProps {
  variant?: ServiceIconVariant;
  className?: string;
}

export function ServiceOrbitIcon({
  variant = "cooling",
  className = "",
}: ServiceOrbitIconProps) {
  return (
    <span
      className={`service-orbit-icon relative inline-flex h-14 w-14 md:h-18 md:w-18 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* ── COOLING: rotating snowflake ── */}
      {variant === "cooling" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <g
            className="so-snow-spin"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <line x1="28" y1="11" x2="28" y2="45" strokeWidth="1.8" />
            <line x1="11" y1="28" x2="45" y2="28" strokeWidth="1.8" />
            <line x1="16" y1="16" x2="40" y2="40" strokeWidth="1.6" />
            <line x1="40" y1="16" x2="16" y2="40" strokeWidth="1.6" />
            {/* arm ticks */}
            <line x1="23" y1="15" x2="28" y2="20" strokeWidth="1.2" />
            <line x1="33" y1="15" x2="28" y2="20" strokeWidth="1.2" />
            <line x1="23" y1="41" x2="28" y2="36" strokeWidth="1.2" />
            <line x1="33" y1="41" x2="28" y2="36" strokeWidth="1.2" />
            <line x1="15" y1="23" x2="20" y2="28" strokeWidth="1.2" />
            <line x1="15" y1="33" x2="20" y2="28" strokeWidth="1.2" />
            <line x1="41" y1="23" x2="36" y2="28" strokeWidth="1.2" />
            <line x1="41" y1="33" x2="36" y2="28" strokeWidth="1.2" />
          </g>
          <circle cx="28" cy="28" r="2.8" className="fill-primary-700" />
        </svg>
      )}

      {/* ── HEATING: flickering flame outline ── */}
      {variant === "heating" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <g
            className="so-flame-group"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M28 10 C28 10 38 19 36 28 C36 28 42 23 40 16 C40 16 47 24 45 34 C45 41 38 47 28 47 C18 47 11 41 11 34 C9 24 16 16 16 16 C14 23 20 28 20 28 C18 19 28 10 28 10Z"
              strokeWidth="1.7"
            />
            <path
              d="M28 22 C28 22 33 28 31 33 C33 31 35 29 34 25 C34 25 37 29 36 34 C36 38 33 43 28 43 C23 43 20 38 20 34 C19 29 22 25 22 25 C21 29 25 33 23 33 C21 28 28 22 28 22Z"
              strokeWidth="1.3"
            />
          </g>
          <circle cx="28" cy="43" r="1.5" className="fill-primary-700" />
        </svg>
      )}

      {/* ── COMPRESSOR: spinning rotor inside ring ── */}
      {variant === "compressor" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <circle
            cx="28" cy="28" r="17"
            fill="none" stroke="currentColor" strokeWidth="1.6"
          />
          <g
            className="so-comp-rotor"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <line x1="28" y1="18" x2="28" y2="38" strokeWidth="1.5" />
            <line x1="18" y1="28" x2="38" y2="28" strokeWidth="1.5" />
            <line x1="21" y1="21" x2="35" y2="35" strokeWidth="1.3" />
            <line x1="35" y1="21" x2="21" y2="35" strokeWidth="1.3" />
          </g>
          <g className="so-comp-dot">
            <circle cx="28" cy="11" r="1.8" className="fill-primary-500" />
          </g>
          <circle cx="28" cy="28" r="2.8" className="fill-primary-700" />
        </svg>
      )}

      {/* ── THERMOSTAT: thermometer with animated mercury ── */}
      {variant === "thermostat" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <rect
            x="24.5" y="9" width="7" height="30" rx="3.5"
            fill="none" stroke="currentColor" strokeWidth="1.7"
          />
          <g className="so-merc">
            <rect
              x="26.5" y="24" width="3" height="15" rx="1.5"
              className="fill-primary-500"
            />
          </g>
          <circle
            cx="28" cy="43" r="5.5"
            fill="none" stroke="currentColor" strokeWidth="1.7"
          />
          <circle cx="28" cy="43" r="3" className="fill-primary-700" />
          <line x1="31.5" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="31.5" y1="21" x2="34" y2="21" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="31.5" y1="27" x2="35" y2="27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="31.5" y1="33" x2="34" y2="33" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
        </svg>
      )}

      {/* ── VENTILATION: spinning fan blades inside ring ── */}
      {variant === "ventilation" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <circle
            cx="28" cy="28" r="17"
            fill="none" stroke="currentColor" strokeWidth="1.6"
          />
          <g
            className="so-fan-spin"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M28 28 Q25 20 28 11 Q31 20 28 28Z" strokeWidth="1.5" />
            <path d="M28 28 Q36 25 45 28 Q36 31 28 28Z" strokeWidth="1.5" />
            <path d="M28 28 Q31 36 28 45 Q25 36 28 28Z" strokeWidth="1.5" />
            <path d="M28 28 Q20 31 11 28 Q20 25 28 28Z" strokeWidth="1.5" />
          </g>
          <circle cx="28" cy="28" r="2.8" className="fill-primary-700" />
        </svg>
      )}

      {/* ── HEAT PUMP: dual opposing arcs with flowing dashes ── */}
      {variant === "heatpump" && (
        <svg viewBox="0 0 56 56" className="text-primary-500">
          <path
            className="so-flow-hot"
            d="M13 22 A17 17 0 0 1 43 22"
            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          />
          <path
            className="so-flow-cold"
            d="M43 34 A17 17 0 0 1 13 34"
            fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
          />
          <circle
            cx="28" cy="28" r="6"
            fill="none" stroke="currentColor" strokeWidth="1.6"
          />
          <circle cx="28" cy="28" r="2.8" className="fill-primary-700" />
          <path d="M12 20 L13 24 L17 22Z" className="fill-primary-500" />
          <path d="M44 36 L43 32 L39 34Z" className="fill-primary-500" />
        </svg>
      )}
    </span>
  );
}

export default ServiceOrbitIcon;
