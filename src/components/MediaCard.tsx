export type MediaItem = {
  id: string;
  type: "photo" | "video";
  title: string;
  src: string;
  poster?: string;
  mime?: string;
  alt?: string;
  caption?: string;
};

export default function MediaCard({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: () => void;
}) {
  if (item.type === "photo") {
    return (
      <button className="card" onClick={onOpen} aria-label={`Open photo: ${item.title}`}>
        <img src={item.src} alt={item.alt || item.title} loading="lazy" decoding="async" />
        <div className="card-meta">
          <h3>{item.title}</h3>
        </div>
      </button>
    );
  }

  // video card (autoplays inline; click still opens lightbox)
  return (
    <div className="card" onClick={onOpen} role="button" aria-label={`Open video: ${item.title}`}>
      <video
        src={item.src}
        poster={item.poster}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "260px", objectFit: "cover" }}
      />
      <div className="card-meta">
        <h3>{item.title}</h3>
      </div>
    </div>
  );
}
