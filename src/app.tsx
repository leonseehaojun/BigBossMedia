import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero.tsx";
import MediaGrid from "./components/MediaGrid";
import Footer from "./components/Footer.tsx";
import media from "./data/media.ts";
import StatsBand from "./components/StatsBand";
import TeamSection from "./components/TeamSection";
import ScrollyProcess from "./components/ScrollyProcess";
import ContactForm from "./components/ContactForm";


type Filter = "All" | "Photo" | "Video";

export default function App() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = media.filter((m) =>
    filter === "All" ? true : m.type === filter.toLowerCase()
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="BIG BOSS MEDIA"
          subtitle="We bring eyes to your businesses through Content Creation."
          cta={{ label: "Contact", href: "#contact" }}
        />
        <StatsBand /> 

        <section id="work" className="container section">
          <h2 className="section-title">Our Works</h2>

          <div className="filters" role="tablist" aria-label="Media filters">
            {(["All", "Photo", "Video"] as Filter[]).map((tab) => (
              <button
                key={tab}
                className={`chip ${filter === tab ? "active" : ""}`}
                onClick={() => setFilter(tab)}
                role="tab"
                aria-selected={filter === tab}
                aria-controls="media-grid"
              >
                {tab}
              </button>
            ))}
          </div>

          <MediaGrid id="media-grid" items={filtered} />
        </section>
        <TeamSection />

        <ScrollyProcess />

        <section id="contact" className="section container">
          <h2 className="section-title">Let’s work together</h2>
          <p className="mb-6">
            We create concise, compelling visuals for brands and publishers.
            Fill out the form below and we’ll get back to you shortly.
          </p>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
