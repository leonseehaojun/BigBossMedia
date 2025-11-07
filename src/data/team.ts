// src/data/team.ts
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  linkedin?: string;
  layout?: "portrait" | "group";
  span?: number;
  photoPosition?: string;
};

const team: TeamMember[] = [
  {
    id: "t-1",
    name: "Zen Tay",
    role: "Founder & Director",
    photo: "/zen.JPG",
    photoPosition: "center top",
    bio: "Leads creative direction and orchestrates campaigns that balance artistry with measurable outcomes.",
  },
  {
    id: "t-2",
    name: "Valda Lim",
    role: "Content Strategist",
    photo: "/valda.JPG",
    photoPosition: "center 35%",
    bio: "Turns research into scroll-stopping concepts, mapping each deliverable to a channel-specific strategy.",
  },
  {
    id: "t-3",
    name: "Ferlin",
    role: "Production Specialist",
    photo: "/ferlin.JPG",
    photoPosition: "center 40%",
    bio: "Keeps shoots seamless from storyboard to final grade, ensuring every detail aligns with the brand vision.",
  },
  {
    id: "t-4",
    name: "On-Set Crew",
    role: "Production Day",
    photo: "/group.JPG",
    layout: "group",
    span: 8,
    bio: "From lighting to continuity, our crew keeps production days smooth so talent can focus on delivering magnetic performances.",
  },
];

export default team;