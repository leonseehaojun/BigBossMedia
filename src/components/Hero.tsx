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
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
            {cta && (
              <a className="btn" href={cta.href}>
                {cta.label}
              </a>
            )}
          </div>
        </Reveal>

        {/* Right column (visual) */}
        <Reveal y={28} delay={0.12}>
          <div className="hero-media" aria-hidden="true">
            <img 
              src="LOGO.jpg" 
              alt="Hero visual" 
              className="hero-image" 
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
