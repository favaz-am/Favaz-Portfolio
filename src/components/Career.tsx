"use client";

import { useEffect, useRef } from "react";

interface Milestone {
  index: string;
  year: string;
  role: string;
  organization: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    index: "01",
    year: "2024",
    role: "Higher Secondary Graduation",
    organization: "Govt. GHSS Kavanur · Plus Two",
    description:
      "Completed Plus Two in Bio Science, building analytical discipline and structured problem-solving habits before making a dedicated pivot into software engineering.",
  },
  {
    index: "02",
    year: "2025",
    role: "Bachelor of Computer Applications",
    organization: "Indira Gandhi National Open University",
    description:
      "Began my undergraduate degree in Computer Applications to establish a formal foundation in programming logic, data structures, databases, and software architecture.",
  },
  {
    index: "03",
    year: "2025",
    role: "MERN Stack Development",
    organization: "Full-Stack Web Engineering",
    description:
      "Mastered end-to-end web development with MongoDB, Express.js, React, and Node.js—architecting scalable REST APIs, authentication flows, and responsive interfaces.",
  },
  {
    index: "04",
    year: "NOW",
    role: "Interactive 3D Web & AI Systems",
    organization: "Karamol AI & German-Exam-Ai",
    description:
      "Building next-generation applications with Next.js, TypeScript, and React Three Fiber—including Karamol, a 3D desktop AI assistant, and German-Exam-Ai, an AI-driven B2 speaking platform.",
  },
];

export default function Career() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.68;
      const travelDistance = Math.max(rect.height - windowHeight * 0.14, 1);
      let progress = Math.min(Math.max((start - rect.top) / travelDistance, 0), 1);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;
      if (atBottom) progress = 1;

      if (beamRef.current) {
        beamRef.current.style.height = `${progress * 100}%`;
      }
      if (orbRef.current) {
        orbRef.current.style.top = `${progress * 100}%`;
        orbRef.current.style.opacity = progress > 0.01 ? "1" : "0";
      }

      const beamY = rect.top + progress * rect.height;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const yearPill = row.querySelector(".career-year");
        const triggerY = yearPill
          ? yearPill.getBoundingClientRect().top
          : row.getBoundingClientRect().top;

        const isReached = beamY >= triggerY;
        row.dataset.active = isReached ? "true" : "false";

        if (index === 1 && orbRef.current) {
          orbRef.current.dataset.flicker = !isReached ? "true" : "false";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="career" className="career-section">
      <div className="career-container">
        <div className="career-header">
          <h2 className="career-heading">
            MY <span className="career-accent">CAREER</span> &amp;
            <br />
            EXPERIENCE
          </h2>
        </div>

        <div ref={timelineRef} className="career-timeline">
          <div className="career-track">
            <div ref={beamRef} className="career-beam" />
            <div ref={orbRef} className="career-orb" />
          </div>

          <div className="career-rows">
            {MILESTONES.map((item, idx) => (
              <div
                key={`${item.year}-${idx}`}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="career-row"
                data-active="false"
              >
                {/* Left Column */}
                <div className="career-left">
                  <span className="career-index">{item.index}</span>
                  <h3 className="career-role">{item.role}</h3>
                  <p className="career-org">{item.organization}</p>
                </div>

                {/* Center Column */}
                <div className="career-center">
                  <span className="career-year">
                    {item.year}
                    <svg
                      className="career-year-flow"
                      viewBox="0 0 120 44"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        className="flow-path"
                        d="M 60 1 H 98 A 21 21 0 0 1 98 43 H 60"
                        pathLength={100}
                      />
                      <path
                        className="flow-path"
                        d="M 60 1 H 22 A 21 21 0 0 0 22 43 H 60"
                        pathLength={100}
                      />
                    </svg>
                  </span>
                </div>

                {/* Right Column (Glassmorphic Card) */}
                <div className="career-right">
                  <div className="career-card">
                    <p className="career-desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}