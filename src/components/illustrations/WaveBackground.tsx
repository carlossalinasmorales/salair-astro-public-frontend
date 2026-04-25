import { useEffect, useRef } from "react";

const WAVES = [
  { baseY: 0.5, amp: 30, freq: 0.0042, speed: 0.0042, sway: 38, swaySpeed: 0.00055, swayPhase: 0.0, color: "rgba(25, 137, 206, 0.5)", width: 2.5 },
  { baseY: 0.5, amp: 24, freq: 0.0055, speed: 0.0060, sway: 30, swaySpeed: 0.00075, swayPhase: 1.1, color: "rgba(9, 26, 56, 0.5)", width: 2.0 },
  { baseY: 0.5, amp: 34, freq: 0.0036, speed: 0.0036, sway: 44, swaySpeed: 0.00045, swayPhase: 2.3, color: "rgba(25, 137, 206, 0.5)", width: 3.0 },
  { baseY: 0.5, amp: 20, freq: 0.0065, speed: 0.0075, sway: 26, swaySpeed: 0.0009, swayPhase: 0.6, color: "rgba(9, 26, 56, 0.42)", width: 2.0 },
  { baseY: 0.5, amp: 28, freq: 0.0048, speed: 0.0048, sway: 50, swaySpeed: 0.0006, swayPhase: 3.5, color: "rgba(25, 137, 206, 0.4)", width: 2.5 },
  { baseY: 0.5, amp: 18, freq: 0.0070, speed: 0.0066, sway: 20, swaySpeed: 0.001, swayPhase: 1.8, color: "rgba(9, 26, 56, 0.36)", width: 1.8 },
  { baseY: 0.5, amp: 36, freq: 0.0030, speed: 0.0030, sway: 55, swaySpeed: 0.0004, swayPhase: 4.2, color: "rgba(25, 137, 206, 0.46)", width: 3.5 },
];

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let t = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width  = canvas!.offsetWidth  * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function drawWave(w: { baseY: any; amp: any; freq: any; speed: any; sway: any; swaySpeed: any; swayPhase: any; color: any; width: any; }, W: number, H: number) {
      if (!ctx) return;
      const swayOffset = Math.sin(t * w.swaySpeed + w.swayPhase) * w.sway;
      const baseY = w.baseY * H + swayOffset;

      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y =
          baseY +
          Math.sin(x * w.freq + t * w.speed) * w.amp +
          Math.sin(x * w.freq * 0.6 + t * w.speed * 0.8 + 1.5) * w.amp * 0.35;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = w.color;
      ctx.lineWidth   = w.width;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    function animate() {
      const W = canvas!.offsetWidth;
      const H = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, W, H);
      WAVES.forEach((w) => drawWave(w, W, H));
      t++;
      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
