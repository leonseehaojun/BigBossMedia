import { useEffect, useRef, useState } from "react";

type Options = Omit<IntersectionObserverInit, "root"> & { once?: boolean };

export function useInView<T extends HTMLElement>(opts: Options = {}) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = opts;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        if (isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView } as const;
}
