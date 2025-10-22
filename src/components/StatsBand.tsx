import { useInView } from "../hooks/useInView"; // you already have this from earlier
import { useCountUp } from "../hooks/useCountUp";
import Reveal from "./reveal";

type Stat = { label: string; value: number; suffix?: string };

const STATS: Stat[] = [
  { label: "Projects", value: 128, suffix: "+" },
  { label: "Views", value: 10_400_000 },
  { label: "Clients", value: 64, suffix: "+" },
  { label: "Awards", value: 12 },
];

export default function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, once: true });

  return (
    <section className="stats" ref={ref} aria-label="Key metrics">
      <div className="container stats-inner">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} y={10} className="stat">
            <StatCard {...s} start={inView} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, start }: Stat & { start: boolean }) {
  const n = useCountUp(value, { duration: 1300, start });

  // Format big numbers nicely
  const formatted = new Intl.NumberFormat("en", { notation: value >= 10000 ? "compact" : "standard" }).format(n);

  return (
    <div className="stat-card">
      <div className="stat-value">
        {formatted}
        {suffix ? <span className="stat-suffix">{suffix}</span> : null}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
