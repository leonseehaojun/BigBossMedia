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
            <article className="card team-card">
              <img src={m.photo} alt={m.name} className="team-photo" />
              <div className="team-body">
                <span className="team-role">{m.role}</span>
                <h3>{m.name}</h3>
                {m.bio ? <p>{m.bio}</p> : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
