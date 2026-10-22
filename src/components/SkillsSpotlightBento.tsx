"use client";

import { MouseEvent, useState } from "react";
import { Layers, Server, Box, GitBranch } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Frontend & Next.js Engineering",
    subtitle: "SSR, App Router & State Architecture",
    icon: Layers,
    colSpan: "md:col-span-7",
    skills: [
      "Next.js (App Router)",
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Framer Motion",
      "Redux / Context API",
    ],
  },
  {
    title: "3D Web & Interactive Graphics",
    subtitle: "WebGL & Real-Time Canvas Control",
    icon: Box,
    colSpan: "md:col-span-5",
    skills: [
      "Three.js",
      "React Three Fiber (R3F)",
      "@react-three/drei",
      "GLTF / GLB Pipelines",
      "ARKit Blendshapes",
      "Custom Cursor Physics",
    ],
  },
  {
    title: "Backend & Database Architecture",
    subtitle: "Scalable APIs & Data Modeling",
    icon: Server,
    colSpan: "md:col-span-5",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose ODM",
      "RESTful APIs",
      "JWT Authentication",
      "AI API Integration",
    ],
  },
  {
    title: "Engineering Workflow & DevOps",
    subtitle: "Production Version Control & Deployment",
    icon: GitBranch,
    colSpan: "md:col-span-7",
    skills: [
      "Git & GitHub",
      "Multi-Branch Workflows",
      "Frontend/Backend Decoupling",
      "Vercel & Cloud Hosting",
      "Postman API Testing",
      "VS Code",
    ],
  },
];

function SpotlightCard({
  group,
}: {
  group: (typeof SKILL_GROUPS)[0];
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = group.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-magnetic
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121113] p-7 transition duration-300 hover:border-[#6E2635]/80 ${group.colSpan}`}
    >
      {/* Dynamic Cursor-Following Burgundy Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(110, 38, 53, 0.22), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#6E2635]/40 bg-[#0A0A0C] text-[#9E4758]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#8E8C94]">
            Core Stack
          </span>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-[#EDEDEF]">
          {group.title}
        </h3>
        <p className="mt-1 text-xs text-[#8E8C94]">{group.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-white/5 bg-[#0A0A0C] px-3 py-1.5 text-xs font-medium text-[#EDEDEF] transition group-hover:border-[#6E2635]/40"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSpotlightBento() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-widest text-[#9E4758]">
          Technical Arsenal
        </p>
        <h2 className="mt-2 text-3xl font-semibold">
          Software Engineering Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {SKILL_GROUPS.map((group) => (
          <SpotlightCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}