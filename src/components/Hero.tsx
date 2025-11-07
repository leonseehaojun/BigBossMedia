import Reveal from "./reveal";

type Props = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
};

export default function Hero({ title, subtitle, cta }: Props) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        {/* Left column (copy) */}
        <Reveal y={20}>
          <div className="hero-copy">
            <p className="hero-eyebrow">Social-first storytelling</p>
            <h1>
              {title} <span className="text-gradient">Content Creation</span>
            </h1>
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}
            <div className="hero-actions">
              {cta && (
                <a className="btn" href={cta.href}>
                  {cta.label}
                </a>
              )}
              <a className="btn ghost" href="#work">
                View our work
              </a>
            </div>

            <ul className="hero-highlights" aria-label="Key differentiators">
              <li>Campaign strategy &amp; content production end-to-end</li>
              <li>Performance insights woven into every deliverable</li>
              <li>Agile crew trusted by regional lifestyle brands</li>
            </ul>
          </div>
        </Reveal>

        {/* Right column (visual) */}
        <Reveal y={28} delay={0.12}>
          <div className="hero-media" aria-hidden="true">
            <div className="hero-orb" />
            <img src="LOGO.jpg" alt="Big Boss Media emblem" className="hero-image" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
