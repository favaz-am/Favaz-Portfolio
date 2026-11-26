"use client";

import { useEffect, useRef } from "react";

const PARAGRAPH_1 =
  "I am a Full-Stack Developer based in Kozhikode, Kerala, currently pursuing my BCA. I specialize in building immersive, interactive web applications and architecting scalable backend systems across the MERN stack, Next.js, and React Three Fiber.";

const PARAGRAPH_2 =
  "Currently, I am developing Karamol AI, an interactive 3D digital assistant powered by LLMs, while actively collaborating with builders at TinkerSpace Calicut.";

export default function AboutSection() {
  const trackRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words1 = PARAGRAPH_1.split(" ");
  const words2 = PARAGRAPH_2.split(" ");
  const totalWords = words1.length + words2.length;

  useEffect(() => {
    let rafId = 0;

    const updateAnimation = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const pinnedDistance = track.offsetHeight - window.innerHeight;
      if (pinnedDistance <= 0) return;

      const rawProgress = Math.min(Math.max(-rect.top / pinnedDistance, 0), 1);
      const revealProgress = Math.min(Math.max(rawProgress / 0.72, 0), 1);

      wordRefs.current.forEach((span, index) => {
        if (!span) return;
        const wordStart = index / totalWords;
        const wordEnd = Math.min((index + 3) / totalWords, 1);
        const wordProgress = Math.min(
          Math.max((revealProgress - wordStart) / (wordEnd - wordStart), 0),
          1
        );

        span.style.opacity = `${0.14 + wordProgress * 0.86}`;
        span.style.transform = `translate3d(0, ${(1 - wordProgress) * 18}px, 0)`;
      });

      if (contentRef.current) {
        const exitProgress = Math.min(Math.max((rawProgress - 0.84) / 0.16, 0), 1);
        contentRef.current.style.opacity = `${1 - exitProgress}`;
        contentRef.current.style.transform = `translate3d(0, ${-exitProgress * 36}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateAnimation();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [totalWords]);

  return (
    <section id="about" ref={trackRef} className="about-scroll-track">
      <div className="about-section">
        <div ref={contentRef} className="about-me">
          <h3 className="about-title">About Me</h3>

          <p className="about-para">
            {words1.map((word, i) => (
              <span
                key={`p1-${i}`}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="split-word"
              >
                {word}
              </span>
            ))}
          </p>

          <p className="about-para about-para-secondary">
            {words2.map((word, i) => (
              <span
                key={`p2-${i}`}
                ref={(el) => {
                  wordRefs.current[words1.length + i] = el;
                }}
                className="split-word"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}