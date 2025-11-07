// src/data/team.ts
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;  
  bio?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    id: "t-1",
    name: "Zen Tay",
    role: "Founder & Director",
    photo: "/zen.jpeg",
    bio: "Leads creative direction and orchestrates campaigns that balance artistry with measurable outcomes.",
  },
  {
    id: "t-2",
    name: "Valda Lim",
    role: "Content Strategist",
    photo: "/team/maya.jpg",
    bio: "Turns research into scroll-stopping concepts, mapping each deliverable to a channel-specific strategy.",
  },
  {
    id: "t-3",
    name: "Ferlin",
    role: "Production Specialist",
    photo: "/team/rio.jpg",
    bio: "Keeps shoots seamless from storyboard to final grade, ensuring every detail aligns with the brand vision.",
  },
];

export default team;
