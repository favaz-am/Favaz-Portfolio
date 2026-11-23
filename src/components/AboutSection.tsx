"use client";

import { useEffect, useRef } from "react";

const PARAGRAPH_1 =
  "I am a Full-Stack Developer based in Kozhikode, Kerala, currently pursuing my BCA. I specialize in building immersive, interactive web applications and architecting scalable backend systems. My core expertise spans the complete MERN stack (MongoDB, Express.js, React, Node.js), along with modern frameworks like Next.js and React Three Fiber.";

const PARAGRAPH_2 =
  "Currently, I am developing Karamol AI, an interactive 3D desktop assistant powered by LLMs. As an active member of TinkerSpace Calicut, I thrive on collaborative software development and continuous learning. Code is my logic, and building intelligent, user-centric applications is my canvas.";

export default function AboutSection() {
  const trackRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words1 = PARAGRAPH_1.split(" ");
  const words2 = PARAGRAPH_2.split(" ");
  const totalWords = words1.length + words2.length;

  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const pinnedDistance = track.offsetHeight - window.innerHeight;
      if (pinnedDistance <= 0) return;

      const scrolledInTrack = -rect.top;
      const rawProgress = Math.min(Math.max(scrolledInTrack / pinnedDistance, 0), 1);

      // 1. Word-by-word reveal finishes at 75% of the pinned runway
      const revealProgress = Math.min(Math.max(rawProgress / 0.75, 0), 1);

      wordRefs.current.forEach((span, index) => {
        if (!span) return;
        const wordStart = index / totalWords;
        const wordEnd = (index + 1) / totalWords;
        const wordProgress = Math.min(
          Math.max((revealProgress - wordStart) / (wordEnd - wordStart), 0),
          1
        );
        span.style.opacity = `${0.16 + wordProgress * 0.84}`;
      });

      // 2. Smooth exit fade & slight upward drift from 85% -> 100% before unpinning
      if (contentRef.current) {
        const exitProgress = Math.min(Math.max((rawProgress - 0.85) / 0.15, 0), 1);
        contentRef.current.style.opacity = `${1 - exitProgress}`;
        contentRef.current.style.transform = `translateY(${-exitProgress * 35}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalWords]);

  return (
    <section id="about" ref={trackRef} className="about-scroll-track">
      <div className="about-wrapper">
        <div
          ref={contentRef}
          className="about-content"
          style={{ willChange: "opacity, transform" }}
        >
          <h2 className="about-title">A B O U T &nbsp;&nbsp; M E</h2>

          <p className="about-text">
            {words1.map((word, i) => (
              <span
                key={`p1-${i}`}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="scroll-word"
              >
                {word}{" "}
              </span>
            ))}
          </p>

          <p className="about-text">
            {words2.map((word, i) => (
              <span
                key={`p2-${i}`}
                ref={(el) => {
                  wordRefs.current[words1.length + i] = el;
                }}
                className="scroll-word"
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}