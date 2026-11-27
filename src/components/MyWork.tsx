"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { PROJECTS } from "@/data/projects";

const FEATURED_PROJECTS = PROJECTS.slice(0, 4);

export default function MyWork() {
  const runwayRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetX = 0;
    let currentX = 0;
    let rafId = 0;

    const updateTarget = () => {
      const runway = runwayRef.current;
      const track = trackRef.current;
      if (!runway || !track) return;

      const rect = runway.getBoundingClientRect();
      const scrollableDistance = runway.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
      targetX = -progress * maxTranslate;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.075;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    updateTarget();
    currentX = targetX;
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="projects" ref={runwayRef} className="mywork-scroll-runway">
      <div className="mywork-sticky">
        <div className="mywork-header">
          <h2 className="mywork-heading">
            My <span className="mywork-accent">Work</span>
          </h2>
        </div>

        <div className="mywork-viewport">
          <div ref={trackRef} className="mywork-track">
            {FEATURED_PROJECTS.map((project) => (
              <div key={project.id} className="mywork-slide">
                <div className="mywork-info">
                  <div className="mywork-info-top">
                    <span className="mywork-num">{project.num}</span>
                    <div className="mywork-title-group">
                      <h3 className="mywork-title">{project.title}</h3>
                      <p className="mywork-cat">{project.category}</p>
                    </div>
                  </div>

                  <div className="mywork-tools">
                    <h4 className="mywork-tools-label">Tools and features</h4>
                    <p className="mywork-tools-list">{project.tools}</p>
                  </div>
                </div>

                <WorkImage
                  image={project.image}
                  alt={project.title}
                  link={project.link}
                />
              </div>
            ))}

            {/* Final CTA Slide */}
            <div className="mywork-cta-slide">
              <div className="mywork-cta-content">
                <h3 className="mywork-cta-title">Want to see more?</h3>
                <p className="mywork-cta-sub">
                  Explore all of my projects, experiments, and open-source repositories.
                </p>
                <Link href="/myworks" className="mywork-cta-btn" data-cursor="disable">
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