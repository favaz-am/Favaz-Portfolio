"use client";

import { useEffect, useRef } from "react";

interface SkillItem {
  name: string;
  url: string;
  icon?: string;
  glyph?: string;
  invert?: boolean;
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILL_ROWS: SkillItem[][] = [
  [
    { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg`, url: "https://www.typescriptlang.org" },
    { name: "Python", icon: `${DEVICON}/python/python-original.svg`, url: "https://www.python.org" },
    { name: "C", icon: `${DEVICON}/c/c-original.svg`, url: "https://en.cppreference.com/w/c" },
    { name: "C++", icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, url: "https://isocpp.org" },
    { name: "HTML5", icon: `${DEVICON}/html5/html5-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", icon: `${DEVICON}/css3/css3-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "React", icon: `${DEVICON}/react/react-original.svg`, url: "https://react.dev" },
    { name: "Next.js", icon: `${DEVICON}/nextjs/nextjs-original.svg`, url: "https://nextjs.org", invert: true },
    { name: "Bootstrap", icon: `${DEVICON}/bootstrap/bootstrap-original.svg`, url: "https://getbootstrap.com" },
  ],
  [
    { name: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg`, url: "https://nodejs.org" },
    { name: "Express.js", icon: `${DEVICON}/express/express-original.svg`, url: "https://expressjs.com", invert: true },
    { name: "Three.js", icon: `${DEVICON}/threejs/threejs-original.svg`, url: "https://threejs.org", invert: true },
    { name: "R3F", glyph: "3D", url: "https://r3f.docs.pmnd.rs" },
    { name: "Tailwind", icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, url: "https://tailwindcss.com" },
    { name: "Vite", icon: `${DEVICON}/vitejs/vitejs-original.svg`, url: "https://vite.dev" },
    { name: "REST API", glyph: "{}", url: "https://restfulapi.net" },
    { name: "Linux", icon: `${DEVICON}/linux/linux-original.svg`, url: "https://www.linux.org" },
  ],
  [
    { name: "MongoDB", icon: `${DEVICON}/mongodb/mongodb-original.svg`, url: "https://www.mongodb.com" },
    { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg`, url: "https://www.mysql.com" },
    { name: "SQL", glyph: "SQL", url: "https://www.w3schools.com/sql/" },
    { name: "DBMS", glyph: "DB", url: "https://www.geeksforgeeks.org/dbms/" },
    { name: "Firebase", icon: `${DEVICON}/firebase/firebase-plain.svg`, url: "https://firebase.google.com" },
  ],
  [
    { name: "Git", icon: `${DEVICON}/git/git-original.svg`, url: "https://git-scm.com" },
    { name: "GitHub", icon: `${DEVICON}/github/github-original.svg`, url: "https://github.com", invert: true },
    { name: "VS Code", icon: `${DEVICON}/vscode/vscode-original.svg`, url: "https://code.visualstudio.com" },
  ],
  [
    { name: "Postman", icon: `${DEVICON}/postman/postman-original.svg`, url: "https://www.postman.com" },
    { name: "Vercel", icon: `${DEVICON}/vercel/vercel-original.svg`, url: "https://vercel.com", invert: true },
  ],
];

export default function TechStack() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="techstack" className="techstack-section">
      {/* Video Background */}
      <div className="techstack-video-container" aria-hidden="true">
        <video
          ref={videoRef}
          preload="none"
          loop
          muted
          playsInline
          className="techstack-video"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        <div className="techstack-overlay" />
      </div>

      {/* Content */}
      <div className="techstack-container">
        <h2 className="techstack-heading">
          TECH <span className="techstack-accent">STACK</span>
        </h2>

        <div className="techstack-pyramid">
          {SKILL_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={skill.name}
                  className="techstack-card"
                >
                  <div className="techstack-icon-wrap">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`techstack-icon ${skill.invert ? "is-inverted" : ""}`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="techstack-glyph">{skill.glyph}</span>
                    )}
                  </div>
                  <span className="techstack-label">{skill.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="techstack-actions">
          <a
            href="mailto:favazam98@gmail.com?subject=Freelance%20Project%20Inquiry"
            className="techstack-btn techstack-btn-secondary"
          >
            Start a Project <span aria-hidden="true">→</span>
          </a>
          <a
            href="https://www.linkedin.com/in/favaz-am/"
            target="_blank"
            rel="noopener noreferrer"
            className="techstack-btn techstack-btn-primary"
          >
            Hire Me <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}