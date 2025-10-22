import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import Reveal from "./reveal";

type Step = {
  id: string;
  title: string;
  body: string;
  thumb?: string; // optional image shown in sticky panel
};

const STEPS: Step[] = [
  { id: "research", title: "Research", body: "We investigate audience, channels, and past performance to set a direction." },
  { id: "concept",  title: "Concept",  body: "We storyboard visuals and tone, aligning the creative arc with your goals." },
  { id: "produce",  title: "Production", body: "We capture and craft, from cinematography to color to sound design." },
  { id: "launch",   title: "Launch",   body: "We ship, measure, and iterate to maximize impact across platforms." },
];

export default function ScrollyProcess() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  // Track which step is currently centered using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-step]'));
    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        let top: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!top || e.intersectionRatio > top.intersectionRatio)) top = e;
        }
        if (top) {
          const idx = Number((top.target as HTMLElement).dataset.index || "0");
          setActive(idx);
        }
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: [0.2, 0.5, 0.8] }
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // reveal band animation
  const { ref: bandRef } = useInView<HTMLDivElement>({ threshold: 0.15, once: true });

  return (
    <section className="scrolly" ref={containerRef}>
      <div className="container scrolly-inner" ref={bandRef}>
        {/* Sticky left column */}
        <div className="scrolly-sticky">
          <Reveal>
            <p className="eyebrow">Our Process</p>
            <h2 className="scrolly-title">{STEPS[active].title}</h2>
            <p className="scrolly-body">{STEPS[active].body}</p>
          </Reveal>
        </div>

        {/* Scrollable right column */}
        <div className="scrolly-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05} y={16} className={`step ${active === i ? "is-active" : ""}`} >
              <div className="step-card" data-step data-index={i}>
                <div className="step-index">{String(i + 1).padStart(2, "0")}</div>
                <div className="step-meta">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
