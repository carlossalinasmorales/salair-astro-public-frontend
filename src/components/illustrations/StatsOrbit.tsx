import "@styles/domains/stats-orbit.css";
import { useId } from "react";

interface StatsOrbitProps {
  className?: string;
}

export function StatsOrbit({ className = "" }: StatsOrbitProps) {
  const uid = useId().replace(/:/g, "");

  const ids = {
    aura: `aura-${uid}`,
    core: `core-${uid}`,
    ring: `ring-${uid}`,
  };

  return (
    <div
      className={`stats-orbit-stage relative flex min-h-104 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(32,141,209,0.16),rgba(22,37,66,0.08),transparent_72%)]" />

      <svg
        className="stats-orbit-asset relative z-10 h-120 w-120"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={ids.aura} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#208DD1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#208DD1" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={ids.core} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#208DD1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#162542" stopOpacity="0.15" />
          </radialGradient>

          <linearGradient id={ids.ring} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#208DD1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#162542" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <circle cx="240" cy="240" r="190" fill={`url(#${ids.aura})`} className="so-soft-pulse" />

        <g className="so-ring-cw">
          <circle cx="240" cy="240" r="176" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.45" />
          <circle cx="240" cy="64" r="5" className="fill-primary-500 blur-xs" opacity="0.85" />
        </g>

        <g className="so-ring-ccw">
          <circle cx="240" cy="240" r="132" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="372" cy="240" r="4.5" className="fill-secondary-500 blur-xs" opacity="0.8" />
        </g>

        <g className="so-ring-cw-slow">
          <circle cx="240" cy="240" r="88" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.55" />
          <circle cx="240" cy="328" r="4" className="fill-primary-500 blur-xs" opacity="0.8" />
        </g>

        <circle cx="240" cy="240" r="30" fill={`url(#${ids.core})`} className="so-core-pulse fill-primary-500/50 blur-lg" />
        <circle cx="240" cy="240" r="12" className="fill-primary-500/50 blur-xs" />
      </svg>
    </div>
  );
}
