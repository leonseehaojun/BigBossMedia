import { useEffect, useRef } from "react";
import type { MediaItem } from "./MediaCard";

export default function Lightbox({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  // When the video metadata is ready, size the frame to the intrinsic video size
  // (fit within viewport, but NEVER upscale to avoid blur).
  const onLoadedMeta = () => {
    if (!videoRef.current || !frameRef.current) return;
    const v = videoRef.current;
    const w = v.videoWidth || 0;
    const h = v.videoHeight || 0;
    if (!w || !h) return;

    const maxW = window.innerWidth * 0.92;  // modal padding
    const maxH = window.innerHeight * 0.9;  // keep some room for chrome/caption
    const scale = Math.min(maxW / w, maxH / h, 1); // 👈 never upscale above 1

    frameRef.current.style.width = `${Math.floor(w * scale)}px`;
    frameRef.current.style.height = `${Math.floor(h * scale)}px`;
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div ref={frameRef} className="lightbox-media">
          {item.type === "photo" ? (
            <img src={item.src} alt={item.alt || item.title} />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop           
              controls
              playsInline
              preload="auto"
              poster={item.poster || "/poster.jpg"}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src={item.src} type={item.mime || "video/mp4"} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {(item.title || item.caption) && (
          <div className="lightbox-caption">
            <strong>{item.title}</strong>
            {item.caption ? <p>{item.caption}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}
