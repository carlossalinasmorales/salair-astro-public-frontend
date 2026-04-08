import { useId } from "react";

/**
 * @typedef {Object} Props
 * @property {string} [className] - Optional CSS class name
 */

/**
 * @param {Props} props
 */
export function StatsOrbit({ className = "" }) {
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

        <g className="so-ring-cw" transformOrigin="240 240">
          <circle cx="240" cy="240" r="176" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.45" />
          <circle cx="240" cy="64" r="5" className="fill-primary-500 blur-xs" opacity="0.85" />
        </g>

        <g className="so-ring-ccw" transformOrigin="240 240">
          <circle cx="240" cy="240" r="132" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="372" cy="240" r="4.5" className="fill-secondary-500 blur-xs" opacity="0.8" />
        </g>

        <g className="so-ring-cw-slow " transformOrigin="240 240" >
          <circle cx="240" cy="240" r="88" stroke={`url(#${ids.ring})`} strokeWidth="1.2" fill="none" opacity="0.55" />
          <circle cx="240" cy="328" r="4" className="fill-primary-500 blur-xs" opacity="0.8" />
        </g>

        <circle cx="240" cy="240" r="30" fill={`url(#${ids.core})`} className="so-core-pulse fill-primary-500 blur-lg" />
        <circle cx="240" cy="240" r="12" className="fill-primary-500 blur-xs" opacity="0.50" />
      </svg>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .stats-orbit-stage { animation: so-drift 8s ease-in-out infinite; }
          .stats-orbit-aura { animation: so-aura 4.6s ease-in-out infinite; }
          .so-ring-cw { animation: so-cw 18s linear infinite; }
          .so-ring-ccw { animation: so-ccw 24s linear infinite; }
          .so-ring-cw-slow { animation: so-cw 14s linear infinite; }
          .so-soft-pulse { animation: so-soft 4.2s ease-in-out infinite; }
          .so-core-pulse { animation: so-core 2.8s ease-in-out infinite; }
        }

        @keyframes so-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes so-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes so-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes so-aura { 0%,100% { opacity: .35; transform: translate(-50%, -50%) scale(.95); } 50% { opacity: .6; transform: translate(-50%, -50%) scale(1.05); } }
        @keyframes so-soft { 0%,100% { opacity: .3; } 50% { opacity: .5; } }
        @keyframes so-core { 0%,100% { opacity: .55; transform: scale(.92); } 50% { opacity: .85; transform: scale(1.1); } }
      `}</style>
    </div>
  );
}
