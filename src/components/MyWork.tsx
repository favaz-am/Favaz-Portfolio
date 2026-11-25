"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #2b1015 0%, #5c1922 50%, #141218 100%)",
  "linear-gradient(135deg, #161829 0%, #3b1d2e 55%, #0f0e14 100%)",
  "linear-gradient(135deg, #1f1216 0%, #4a151b 50%, #100f14 100%)",
];

export default function MyWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    let targetX = 0;
    let currentX = 0;
    let rafId = 0;

    const updateTarget = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
      targetX = -progress * maxTranslate;
    };

    const animate = () => {
      // 0.075 = silky spinner-like coasting inertia (lower = longer glide)
      currentX += (targetX - currentX) * 0.075;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    updateTarget();
    currentX = targetX; // Snap on initial load so it doesn't drift in from 0
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="mywork-scroll-runway">
      <div className="mywork-sticky">
        <div className="mywork-header">
          <h2 className="mywork-heading">
            My <span className="mywork-accent">Work</span>
          </h2>
        </div>

        <div className="mywork-viewport">
          <div ref={trackRef} className="mywork-track">
            {PROJECTS.map((project, index) => {
             const isReversed = index % 2 === 0;
              const num = String(index + 1).padStart(2, "0");
              const linkHref = project.liveUrl || project.githubUrl || "#";
              const bgGradient =
                project.gradient ||
                FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

              const infoBlock = (
                <div className="mywork-info">
                  <div className="mywork-info-top">
                    <span className="mywork-num">{num}</span>
                    <div className="mywork-title-group">
                      <h3 className="mywork-title">{project.title}</h3>
                      <p className="mywork-cat">{project.category}</p>
                    </div>
                  </div>
                  <div className="mywork-tools">
                    <p className="mywork-tools-label">Tools and features</p>
                    <p className="mywork-tools-list">
                      {project.techStack.join(", ")}
                    </p>
                  </div>
                </div>
              );

              const visualBlock = (
                <a
                  href={linkHref}
                  target={linkHref !== "#" ? "_blank" : undefined}
                  rel={linkHref !== "#" ? "noopener noreferrer" : undefined}
                  className="mywork-visual"
                  style={{ background: bgGradient }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mywork-img"
                    />
                  ) : (
                    <div className="mywork-placeholder">
                      <span className="mywork-placeholder-tag">
                        {project.statusLabel}
                      </span>
                      <h4 className="mywork-placeholder-title">
                        {project.title}
                      </h4>
                      <span className="mywork-placeholder-sub">
                        {project.progress}% Complete
                      </span>
                    </div>
                  )}
                </a>
              );

              return (
                <article
                  key={project.id}
                  className={`mywork-slide ${isReversed ? "is-reversed" : ""}`}
                >
                  {isReversed ? (
                    <>
                      {infoBlock}
                      {visualBlock}
                    </>
                  ) : (
                    <>
                      {visualBlock}
                      {infoBlock}
                    </>
                  )}
                </article>
              );
            })}

            {/* Final CTA Panel */}
            <div className="mywork-cta-slide">
              <div className="mywork-cta-content">
                <h3 className="mywork-cta-title">Want to see more?</h3>
                <p className="mywork-cta-sub">
                  Explore all of my projects and creations
                </p>
                <Link href="/myworks" className="mywork-cta-btn">
                  See All Works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}