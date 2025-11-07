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
  const isVideo = item.type === "video";

  return (
    <button
      type="button"
      className="card media-card"
      onClick={onOpen}
      aria-label={`Open ${isVideo ? "video" : "photo"}: ${item.title}`}
    >
      <div className="media-thumb">
        {isVideo ? (
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={item.src} alt={item.alt || item.title} loading="lazy" decoding="async" />
        )}
        <span className={`media-badge ${isVideo ? "is-video" : "is-photo"}`}>
          {isVideo ? "Video" : "Photo"}
        </span>
      </div>
      <div className="card-meta">
        <h3>{item.title}</h3>
        {item.caption ? <p>{item.caption}</p> : null}
      </div>
    </button>
  );
}
