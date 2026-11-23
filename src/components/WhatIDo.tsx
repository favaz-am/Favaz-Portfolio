"use client";

import { useState } from "react";

const FULL_STACK_SKILLS = [
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "Next.js",
  "TypeScript",
  "React Three Fiber",
  "REST APIs",
  "Tailwind CSS",
  "Git & GitHub",
];

export default function WhatIDoSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section id="work" className="whatido-section">
      {/* Left: Large "WHAT I DO" Typography */}
      <div className="whatido-left">
        <h2 className="whatido-heading">
          WHAT <br />
          I <span className="whatido-accent">DO</span>
        </h2>
      </div>

      {/* Right: Dashed Corner-Bracketed Full-Stack Card */}
      <div className="whatido-right">
        <div
          className={`whatido-card ${isExpanded ? "whatido-card-open" : ""}`}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {/* 4 White Corner Brackets */}
          <span className="corner-bracket top-left" />
          <span className="corner-bracket top-right" />
          <span className="corner-bracket bottom-left" />
          <span className="corner-bracket bottom-right" />

          <div className="whatido-card-header">
            <h3 className="whatido-card-title">FULL-STACK</h3>
            <p className="whatido-card-subtitle">
              Modern web development &amp; scalable applications
            </p>
          </div>

          <p className="whatido-card-desc">
            Building responsive, high-performance web applications using the
            MERN stack, Next.js, and TypeScript. Architecting clean backend APIs
            and pairing them with interactive, modern UI/UX experiences.
          </p>

          <div className="whatido-skills-block">
            <p className="whatido-skills-label">Skillset &amp; tools</p>
            <div className="whatido-tags">
              {FULL_STACK_SKILLS.map((skill) => (
                <span key={skill} className="whatido-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom-Right Toggle Chevron Box */}
          <button
            type="button"
            className="whatido-toggle-btn"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`whatido-chevron ${isExpanded ? "rotated" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}