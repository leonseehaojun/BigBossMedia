import type { MediaItem } from "../components/MediaCard";

const media: MediaItem[] = [
  {
    id: "v-1",
    type: "video",
    title: "FNB Marketing",
    src: "/vid1.mp4",  
    poster: "/poster1.jpg",   
    mime: "video/mp4",
    alt: "Brand reel highlights",
    caption: "Recent client work.",
  },
  {
    id: "v-2",
    type: "video",
    title: "Motivational",
    src: "/vid2.mp4",     
    poster: "/poster2.jpg",    
    mime: "video/mp4",
    alt: "Behind the scenes footage",
    caption: "Making of our campaign.",
  },
];

export default media;
