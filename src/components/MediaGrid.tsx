import { useState } from "react";
import MediaCard from "./MediaCard";
import type { MediaItem } from "./MediaCard";
import Lightbox from "./Lightbox";
import Reveal from "./reveal"; 

export default function MediaGrid({ items, id }: { items: MediaItem[]; id?: string }) {
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <>
      <div id={id} className="grid">
        {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} y={18} className="grid-span">
            <MediaCard item={item} onOpen={() => setActive(item)} />
            </Reveal>
        ))}
      </div>

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </>
  );
}
