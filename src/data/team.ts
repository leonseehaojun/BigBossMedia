// src/data/team.ts
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;   // put images in /public/team/
  bio?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  { id: "t-1", name: "Zen Tay",  role: "Founder & Director",  photo: "/zen.jpeg" },
  { id: "t-2", name: "Maya Lee",  role: "Producer",            photo: "/team/maya.jpg" },
  { id: "t-3", name: "Rio Chen",  role: "Cinematographer",     photo: "/team/rio.jpg" },
];

export default team;
