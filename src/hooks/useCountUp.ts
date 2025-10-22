import { useEffect, useRef, useState } from "react";

/** Animates a number from 0 → end over duration ms (starts when `start` flips true) */
export function useCountUp(end: number, opts?: { duration?: number; start?: boolean }) {
  const duration = opts?.duration ?? 1200;
  const start = opts?.start ?? false;

  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  const t0 = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const step = (t: number) => {
      if (t0.current == null) t0.current = t;
      const p = Math.min(1, (t - t0.current) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      t0.current = null;
    };
  }, [end, duration, start]);

  return val;
}
