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
  { id: "t-1", name: "Zen Tay",  role: "Founder & Director",  photo: "/zen.jpeg" },
  { id: "t-2", name: "Valda Lim",  role: "Intern",            photo: "/team/maya.jpg" },
  { id: "t-3", name: "Ferlyn",  role: "Intern",     photo: "/team/rio.jpg" },
];

export default team;
