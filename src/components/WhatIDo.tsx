"use client";

import { useEffect, useRef, useState } from "react";

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

const LINE_1 = [
  { char: "W", x: -75, y: -55, r: -28 },
  { char: "H", x: -25, y: 65, r: 22 },
  { char: "A", x: 35, y: -60, r: -18 },
  { char: "T", x: 80, y: 50, r: 30 },
];

const LINE_2 = [
  { char: "I", x: -65, y: 55, r: -24, accent: false },
  { char: "\u00A0", x: 0, y: 0, r: 0, accent: false },
  { char: "D", x: 40, y: -65, r: 25, accent: true },
  { char: "O", x: 85, y: 60, r: -32, accent: true },
];

const ALL_LETTERS = [...LINE_1, ...LINE_2];

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export default function WhatIDo() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const enterStart = windowHeight * 0.98;
      const enterEnd = windowHeight * 0.2;
      const enterProgress = Math.min(
        Math.max((enterStart - rect.top) / (enterStart - enterEnd), 0),
        1
      );

      let exitProgress = 0;
      if (rect.bottom < windowHeight) {
        exitProgress = Math.min(
          Math.max((windowHeight - rect.bottom) / (windowHeight * 0.42), 0),
          1
        );
      }

      ALL_LETTERS.forEach((item, index) => {
        const span = letterRefs.current[index];
        if (!span || item.char === "\u00A0") return;

        const stagger = index * 0.045;
        const localEnter = Math.min(
          Math.max((enterProgress - stagger) / (1 - stagger), 0),
          1
        );
        const bounced = easeOutBack(localEnter);

        const enterX = item.x * (1 - bounced);
        const enterY = item.y * (1 - bounced);
        const enterRot = item.r * (1 - bounced);

        const exitX = item.x * 0.55 * exitProgress;
        const exitY = item.y * 0.35 * exitProgress;
        const exitRot = item.r * 0.75 * exitProgress;

        const scale = (0.65 + 0.35 * bounced) * (1 - exitProgress * 0.18);
        const opacity = Math.min(localEnter * 1.6, 1) * (1 - exitProgress);

        span.style.transform = `translate3d(${enterX + exitX}px, ${enterY + exitY}px, 0) rotate(${enterRot + exitRot}deg) scale(${scale})`;
        span.style.opacity = `${opacity}`;
      });

      if (cardRef.current) {
        const cardEnter = Math.min(Math.max((enterProgress - 0.1) / 0.9, 0), 1);
        const cardBounced = easeOutBack(cardEnter);

        const translateX = 60 * (1 - cardBounced) + 40 * exitProgress;
        const translateY = 20 * (1 - cardBounced);
        const rotateY = -10 * exitProgress;
        const rotateX = 6 * exitProgress;
        const scale = (0.94 + 0.06 * cardBounced) * (1 - exitProgress * 0.08);
        const opacity = Math.min(cardEnter * 1.5, 1) * (1 - exitProgress);

        cardRef.current.style.transform = `perspective(900px) translate3d(${translateX}px, ${translateY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
        cardRef.current.style.opacity = `${opacity}`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="work"
      ref={trackRef}
      className={`whatido-scroll-track ${isVisible ? "is-visible" : ""}`}
    >
      <div className="whatido-section">
        {/* Left: Shatter Typography */}
        <div className="whatido-left">
          <h2 className="whatido-heading">
            <span className="whatido-line">
              {LINE_1.map((item, i) => (
                <span
                  key={`l1-${i}`}
                  ref={(el) => {
                    letterRefs.current[i] = el;
                  }}
                  className="shatter-letter"
                >
                  {item.char}
                </span>
              ))}
            </span>
            <br />
            <span className="whatido-line">
              {LINE_2.map((item, i) => (
                <span
                  key={`l2-${i}`}
                  ref={(el) => {
                    letterRefs.current[LINE_1.length + i] = el;
                  }}
                  className={`shatter-letter ${item.accent ? "whatido-accent" : ""}`}
                >
                  {item.char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Right: Full-Stack Card */}
        <div className="whatido-right">
          <div
            ref={cardRef}
            className={`whatido-card ${isExpanded ? "whatido-card-open" : ""}`}
            style={{ willChange: "transform, opacity" }}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <div className="what-border2" aria-hidden="true">
              <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              </svg>
            </div>

            <div className="what-border1" aria-hidden="true">
              <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>

            <span className="corner-bracket top-left" />
            <span className="corner-bracket top-right" />
            <span className="corner-bracket bottom-left" />
            <span className="corner-bracket bottom-right" />

            <div className="whatido-card-inner">
              <div className="whatido-card-header">
                <h3 className="whatido-card-title">FULL-STACK</h3>
                <p className="whatido-card-subtitle">
                  Modern web development &amp; scalable applications
                </p>
              </div>

              <p className="whatido-card-desc">
                Building responsive, high-performance web applications using the
                MERN stack, Next.js, and TypeScript. Architecting clean backend
                APIs and pairing them with interactive, modern UI/UX experiences.
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
            </div>

            <button
              type="button"
              className="whatido-toggle-btn"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev);
              }}
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
      </div>
    </section>
  );
}