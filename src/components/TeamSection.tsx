// src/components/TeamSection.tsx
import Reveal from "./reveal";
import team from "../data/team";

export default function TeamSection() {
  return (
    <section id="team" className="container section">
      <h2 className="section-title">Meet Our Team</h2>

      <div className="grid">
        {team.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.06} y={18} className="grid-span">
            <article className="card">
              <img src={m.photo} alt={m.name} />
              <div className="card-meta">
                <h3>{m.name}</h3>
                <span>{m.role}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
